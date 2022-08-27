
import { Avatar, Text, Button, Paper } from '@mantine/core';



export default function Profile() {
    const avatar = "https://avatars.githubusercontent.com/u/18677354?v=4";
    const name = "Mantine";
    const email = "mouayed0001@gmail.com"
    const job = "Frontend Developer";
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
        }}>
            <Paper
                radius="md"
                withBorder
                p="xl"
                sx={(theme) => ({
                    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
                    //width 40% then 60% then 80%
                    width: '60%',
                })}
            >
                <Avatar src={avatar} size={120} radius={120} mx="auto" />
                <Text align="center" size="lg" weight={500} mt="md">
                    {name}
                </Text>
                <Text align="center" color="dimmed" size="sm">
                    {email} • {job}
                </Text>

                <Button variant="default" fullWidth mt="md">
                    Send message
                </Button>
            </Paper>
        </div>
    );
}