import { Container, Title } from "@mantine/core";

export default function NoConversationChooseOne(props) {
    return (
        <Container
            sx={(theme) => ({
                width: "100%",
                height: "96vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                "@media (max-width: 643px)": {
                    display: "none",
                },
            })}>
            <Title sx={(theme) => ({
                textAlign: "center",
            })} order={1}>Start a new conversation, choose someone to contact from the contact bar on the left side</Title>
        </Container>
    );
}