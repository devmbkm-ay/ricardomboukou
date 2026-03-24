import {
    Html,
    Body,
    Head,
    Heading,
    Container,
    Text,
    Section,
    Hr,
    Preview,
} from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';

type ContactFormEmailProps = {
    name: string;
    email: string;
    message: string;
};

export default function ContactFormEmail({ name, email, message }: ContactFormEmailProps) {
    return (
        <Html>
            <Head />
            <Preview>New message from your portfolio site</Preview>
            <Tailwind>
                <Body className="bg-gray-100 text-black">
                    <Container>
                        <Section className="bg-white border-black my-10 px-10 py-4 rounded-md">
                            <Heading className="leading-tight">
                                You received a new message from the contact form
                            </Heading>
                            <Text>From: {name}</Text>
                            <Text>Sender's Email: {email}</Text>
                            <Hr />
                            <Heading as="h2" className="text-lg font-semibold">Message:</Heading>
                            <Text>{message}</Text>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}
