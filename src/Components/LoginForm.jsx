import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Divider,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { upperFirst, useToggle } from "@mantine/hooks";
import { IconBrandFacebook, IconBrandGoogle } from "@tabler/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import { doc, getDoc, setDoc } from "firebase/firestore"
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

export default function LoginForm(props) {

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [type, toggle] = useToggle(["login", "register"]);
  const [unvalid] = useState(false);
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      terms: true,
    },
    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) => val.length < 6 ? "Password should include at least 6 characters" : null,
      name: (val) => type === "register" ? (val.length > 0 ? null : "Name is required") : null,
      terms: (val) => val ? null : "You must accept the terms and conditions",
    },
  });


  const submitHandeler = () => {
    console.log(type);
    if (type === "login") {
      LoginHandeler();
    }
    if (type === "register") {
      RegisterHandeler();
    }
  }

  const LoginHandeler = async () => {
    signInWithEmailAndPassword(auth, form.email, form.password)
      .then((userCredential) => {
        const user = userCredential.user;
        getDoc(doc(db, "users", user.uid)).then((docSnap) => {
          if (docSnap.exists()) {
            user.displayName = docSnap.data().displayName;
            user.photoURL = docSnap.data().photoURL;
            dispatch({ type: "LOGIN", payload: user });
            navigate("/");
          } else {
            console.log("document not found");
          }
        }).catch((error) => {
          console.log("error with firstore");
        });
      }).catch((error) => {
        console.log("user not found")
      });
  }


  const RegisterHandeler = async () => {
    createUserWithEmailAndPassword(auth, form.email, form.password)
      .then((userCredential) => {
        const user = userCredential.user;
        setDoc(doc(db, "users", user.uid), {
          displayName: form.name,
          uid: user.uid,
          email: user.email,
          photoURL: user.photoURL,
        });
        user.displayName = form.name;
        console.log(user);
        dispatch({ type: "LOGIN", payload: user });
        navigate("/");
      }).catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage)
      });
  }

  const GoogleAuthHandeler = (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)  // signInWithRedirect(provider)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setDoc(doc(db, "users", user.uid), {
          displayName: user.displayName,
          uid: user.uid,
          email: user.email,
          photoURL: user.photoURL,
        });
        dispatch({ type: "LOGIN", payload: user });
        navigate("/");
      }).catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      }
      );
  }


  return (
    <Container size={500} mt={100} mb={100}>
      <Paper radius="md" p="xl" withBorder {...props}>
        <Text size="lg" weight={500}>
          Welcome to ELMou Chat, {type} with
        </Text>

        <Group grow mb="md" mt="md">
          <Button onClick={GoogleAuthHandeler} leftIcon={<IconBrandGoogle />} radius="xl">
            Google
          </Button>
          <Button disabled leftIcon={<IconBrandFacebook />} radius="xl">
            Facebook
          </Button>
        </Group>

        <Divider
          label="Or continue with email"
          labelPosition="center"
          my="lg"
        />

        <form onSubmit={form.onSubmit(() => submitHandeler())}>
          <Stack>
            {type === "register" && (
              <TextInput
                label="Name"
                placeholder="Your name"
                value={form.values.name}
                onChange={(event) =>
                  form.setFieldValue("name", event.currentTarget.value)
                }
                error={form.errors.name && "Name is required"}
              />
            )}

            <TextInput
              required
              label="Email"
              placeholder="example@example.com"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue("email", event.currentTarget.value)
              }
              error={form.errors.email && "Invalid email"}
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue("password", event.currentTarget.value)
              }
              error={
                form.errors.password &&
                "Password should include at least 6 characters"
              }
            />

            {type === "register" && (
              <Checkbox
                label="I accept terms and conditions"
                checked={form.values.terms}
                onChange={(event) =>
                  form.setFieldValue("terms", event.currentTarget.checked)
                }
                error={form.errors.terms && "You must accept terms and conditions"}
              />
            )}
          </Stack>
          <Divider
            color={unvalid ? "red" : "gray"}
            label={unvalid ? "Invalid email or password" : ""}
            labelPosition="center"
            my="lg"
          />
          <Group position="apart" mt="xl">
            <Anchor
              component="button"
              type="button"
              color="dimmed"
              onClick={() => toggle()}
              size="xs"
            >
              {type === "register"
                ? "Already have an account? Login"
                : "Don't have an account? Register"}
            </Anchor>
            <Button type="submit">{upperFirst(type)}</Button>
          </Group>
        </form>
      </Paper>
    </Container >
  );
}
