
import { Avatar, Text, Button, Paper, Container, Anchor } from '@mantine/core';
import { Link } from 'react-router-dom';



export default function Profile({ avatar, name, email, job }) {
    avatar = "https://avatars.githubusercontent.com/u/18677354?v=4";
    name = "Mantine";
    email = "mouayed0001@gmail.com"
    job = "";
    return (
        <article style={{
            display: "flex", justifyContent: "center", alignItems: "center", height: "100vh",
        }}>
            <Container size="xs" px="xs">
                <Paper radius="md" withBorder p="xl"
                    sx={(theme) => ({
                        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
                    })}
                >
                    <Avatar src={avatar} size={120} radius={120} mx="auto" />
                    <Text align="center" size="lg" weight={500} mt="md">
                        {name}
                    </Text>
                    <Text align="center" color="dimmed" size="sm">
                        {email} • {job}
                    </Text>
                    <Anchor component={Link} to="/">
                        <Button variant="outline" fullWidth mt="md"> Send message </Button>
                    </Anchor>
                </Paper>
            </Container>
        </article >
    );
}


