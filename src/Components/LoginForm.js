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
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, setDoc } from "firebase/firestore";

export default function LoginForm(props) {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  if (user) {
    //navigate("/chat");
  }
  const [type, toggle] = useToggle(["login", "register"]);
  const [unvalid, setUnvalid] = useState(false);
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      terms: true,
    },
    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  const putUserInfoInDb = async (user) => {
    await setDoc(doc(db, "users", user.uid), {
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
    });
    console.log("db done");
  };

  const submitHandeler = (e) => {
    e.preventDefault();
    if (type === "login") {
      signInWithEmailAndPassword(auth, form.values.email, form.values.password)
        .then((userCredential) => {
          const user = userCredential.user;
          setUnvalid(false);
          navigate("/chat");
        }).catch((error) => {
          const errorMessage = error.message;
          console.log(errorMessage);
          setUnvalid(true);
        });
    } else {
      createUserWithEmailAndPassword(auth, form.values.email, form.values.password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          putUserInfoInDb(user);
        }).catch((error) => {
          const errorMessage = error.message;
          console.log(errorMessage)
        });
    }
  };
  return (
    <Container size={500} mt={100} mb={100}>
      <Paper radius="md" p="xl" withBorder {...props}>
        <Text size="lg" weight={500}>
          Welcome to ELMou Chat, {type} with
        </Text>

        <Group grow mb="md" mt="md">
          <Button leftIcon={<IconBrandGoogle />} radius="xl">
            Google
          </Button>
          <Button leftIcon={<IconBrandFacebook />} radius="xl">
            Facebook
          </Button>
        </Group>

        <Divider
          label="Or continue with email"
          labelPosition="center"
          my="lg"
        />

        <form onSubmit={submitHandeler}>
          <Stack>
            {type === "register" && (
              <TextInput
                label="Name"
                placeholder="Your name"
                value={form.values.name}
                onChange={(event) =>
                  form.setFieldValue("name", event.currentTarget.value)
                }
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
      <button onClick={(e) => putUserInfoInDb()}>debugging button!</button>
    </Container>
  );
}
