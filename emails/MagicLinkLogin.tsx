import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
} from "@react-email/components";
import * as React from "react";
interface LoginCodeEmailProps {
    url: string;
}

const baseUrl = process.env.NEXTAUTH_URL ? `${process.env.NEXTAUTH_URL}` : "";

export const MagicLinkLogin = ({ url }: LoginCodeEmailProps) => (
    <Html>
        <Head />
        <Preview>Your magic login link for Caards</Preview>
        <Body style={main}>
            <Container style={container}>
                <Img
                    src={`${baseUrl}/Caards_TextLogo.png`}
                    width='120'
                    height='42'
                    alt='Caards'
                    style={logo}
                />
                <Heading style={heading}>Your Magic Link is here</Heading>
                <Text style={paragraph}>Just click the button below to seamlessly sign-in!</Text>
                <Section style={buttonContainer}>
                    <Button style={button} href={url}>
                        Login to Caards
                    </Button>
                </Section>
                <Text style={paragraph}>
                    This link only be valid for the next 5 minutes. If it expires, please request a
                    new one at the login page.
                </Text>
                <Hr style={hr} />
                <Link href={"https://caards.vercel.app"} style={reportLink}>
                    Caards - Flashcards, powered by AI.
                </Link>
            </Container>
        </Body>
    </Html>
);

export default MagicLinkLogin;

const logo = {
    width: 120,
    height: 42,
};

const main = {
    backgroundColor: "#ffffff",
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
    margin: "0 auto",
    padding: "20px 0 48px",
    maxWidth: "560px",
};

const heading = {
    fontSize: "24px",
    letterSpacing: "-0.5px",
    lineHeight: "1.3",
    fontWeight: "600",
    color: "hsl(0, 0%, 3.8%)",
    padding: "17px 0 0",
};

const paragraph = {
    margin: "0 0 15px",
    fontSize: "15px",
    lineHeight: "1.4",
    color: "#3c4149",
};

const buttonContainer = {
    padding: "27px 0 27px",
};

const button = {
    backgroundColor: "hsl(0, 0%, 9%)",
    borderRadius: "3px",
    fontWeight: "600",
    color: "#fff",
    fontSize: "15px",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "block",
    padding: "11px 23px",
};

const reportLink = {
    fontSize: "14px",
    color: "#b4becc",
};

const hr = {
    borderColor: "#dfe1e4",
    margin: "42px 0 26px",
};
