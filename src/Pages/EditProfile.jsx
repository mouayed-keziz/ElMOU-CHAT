import { Container, Paper, Grid, Avatar, TextInput, Button, Group, UnstyledButton, Center, Text, Progress, Badge, Stack, Space } from "@mantine/core";
import { IconCheck } from "@tabler/icons";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { db, storage } from "../firebase";



export default function EditProfile({ primaryColor }) {

    const { currentUser, dispatch } = useContext(AuthContext);
    const [uid] = useState(currentUser.uid);
    const [displayName, setDisplayName] = useState(currentUser.displayName);

    const [isLoading, setIsLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [photoURL, setPhotoURL] = useState(currentUser.photoURL);
    const [progress, setProgress] = useState(-1);
    const [finished, setFinished] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const uploadFile = async () => {
            const storageRef = ref(storage, 'users/' + uid + file.name.split('.').pop());
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setProgress(Math.floor(progress));
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            setFinished(false)
                            break;
                        default:
                            break;
                    }
                },
                (error) => {
                    setError(true);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setPhotoURL(downloadURL);
                        setFinished(true);
                        setProgress(-1)
                    });
                }
            );
        }
        file && uploadFile();
    }, [file, uid]);

    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const user = {
            displayName,
            photoURL: photoURL,
        }
        await updateDoc(doc(db, "users", uid), user);
        dispatch({ type: "UPDATE_USER", payload: user });
        navigate("/");
    }

    return (
        <article style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", }} >
            <Container size="lg" px="xs">
                <Paper radius="md" withBorder p="xl"
                    sx={(theme) => ({
                        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
                    })}
                >
                    <Grid>
                        <Grid.Col span={6}>
                            <Center>
                                <div>
                                    <UnstyledButton onClick={
                                        () => {
                                            document.getElementById("file").click();
                                            setFinished(false);
                                        }
                                    }>
                                        <Avatar src={photoURL} size={120} radius={120} mx="auto" />
                                        <Center><Text color={primaryColor}>Upload image</Text></Center>
                                    </UnstyledButton>
                                    <Space h='xl' />
                                    <Stack>
                                        {progress >= 0 && progress < 100 &&
                                            <>
                                                <Badge color="blue">Uploading</Badge>
                                                <Progress value={progress} label={`${progress}%`} size="xl" radius="xl" />
                                            </>}
                                        {error && <Badge color="red">Something went wrong!</Badge>}
                                        {finished && <Badge color="green">Upload finished</Badge>}
                                    </Stack>
                                </div>
                                <input style={{ display: "none" }} id="file" type="file"
                                    onChange={(e) => {
                                        setFile(e.target.files[0]);
                                        console.log(file);
                                        setPhotoURL(URL.createObjectURL(e.target.files[0]));
                                        setFinished(false);
                                        setProgress(0)
                                    }} />
                            </Center>
                        </Grid.Col>
                        <Grid.Col span={6}>
                            <form onSubmit={submitHandler} style={{ margin: 'auto' }}>
                                <TextInput label="Name" placeholder="Name" value={displayName} onChange={e => setDisplayName(e.target.value)} />
                                <Group position="center" mt="xl">
                                    <Button loading={isLoading} leftIcon={<IconCheck />} type="submit" variant="outline" >
                                        update
                                    </Button>
                                </Group>
                            </form>
                        </Grid.Col>
                    </Grid>
                </Paper>
            </Container>
        </article >
    );
}

