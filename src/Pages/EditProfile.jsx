import { Container, Paper, Grid, Avatar, TextInput, Button, Group, UnstyledButton, Center, Text } from "@mantine/core";
import { useForm } from '@mantine/form';



export default function EditProfile({ primaryColor }) {
    const form = useForm({
        initialValues: {
            name: '',
        },
    });
    return (
        <article style={{
            display: "flex", justifyContent: "center", alignItems: "center", height: "100vh",
        }} >
            <Container size="lg" px="xs">
                <Paper radius="md" withBorder p="xl"
                    sx={(theme) => ({
                        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
                    })}
                >
                    <Grid>
                        <Grid.Col span={6}>
                            <Center>
                                <UnstyledButton>

                                    <Avatar src="https://avatars.githubusercontent.com/u/18677354?v=4" size={120} radius={120} mx="auto" />
                                    <Center><Text color={primaryColor}>Upload image</Text></Center>
                                </UnstyledButton>
                            </Center>
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <div style={{ margin: 'auto' }}>
                                <TextInput label="Name" placeholder="Name" {...form.getInputProps('name')} />

                                <Group position="center" mt="xl">
                                    <Button
                                        variant="outline"
                                        onClick={() =>
                                            form.setValues({
                                                name: "mouayed",
                                            })
                                        }
                                    >
                                        update
                                    </Button>
                                </Group>
                            </div>
                        </Grid.Col>
                    </Grid>
                </Paper>
            </Container>
        </article >
    );
}

