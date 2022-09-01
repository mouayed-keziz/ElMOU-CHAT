import { Container } from "@mantine/core";

export default function NoConversationChooseOne(props) {
    return (
        <Container
            sx={(theme) => ({
                "@media (max-width: 643px)": {
                    display: "none",
                },
            })}>
            makanch convo
        </Container>
    );
}