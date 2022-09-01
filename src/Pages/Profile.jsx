
import { Avatar, Text, Button, Paper, Container, Anchor } from '@mantine/core';
import { doc, getDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { db } from '../firebase';



export default function Profile(props) {

    const { id } = useParams();
    const [user, setUser] = useState(null);
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const getUser = async (id) => {
            const docRef = doc(db, "users", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setUser(docSnap.data());
            } else {
                navigate("/profile")
            }
        }
        if (id) {
            getUser(id);
        } else {
            setUser(currentUser);
        }
        getUser();
    }, [id, navigate, currentUser]);




    return (
        <article style={{
            display: "flex", justifyContent: "center", alignItems: "center", height: "100vh",
        }}>
            {user ?
                <Container size="xs" px="xs">
                    <Paper radius="md" withBorder p="xl"
                        sx={(theme) => ({
                            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
                        })}
                    >
                        <Avatar src={user.photoURL} size={120} radius={120} mx="auto" />
                        <Text align="center" size="lg" weight={500} mt="md">
                            {user.displayName}
                        </Text>
                        <Text align="center" color="dimmed" size="sm">
                            {user.email} • {"normal user"}
                        </Text>

                        <Anchor component={Link} to={id ? `/chat/${user.uid}` : "/edit"}>
                            <Button variant="outline" fullWidth mt="md"> {id ? "Send message" : "Edit Profile"} </Button>
                        </Anchor>
                    </Paper>
                </Container>
                : "loading"}
        </article >
    );
}


