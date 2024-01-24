import { createTransport } from "nodemailer";
import { SendVerificationRequestParams } from "next-auth/providers/email";
import { render } from "@react-email/render";
import MagicLinkLogin from "./MagicLinkLogin";

export async function sendVerificationRequest(params: SendVerificationRequestParams) {
    const { identifier, url, provider, theme } = params;
    const { host } = new URL(url);
    // NOTE: You are not required to use `nodemailer`, use whatever you want.
    const transport = createTransport(provider.server);
    const result = await transport.sendMail({
        to: identifier,
        from: provider.from,
        subject: `Sign in to Caards`,
        text: `Sign in to Caards`,
        html: render(<MagicLinkLogin url={url} />),
    });
    const failed = result.rejected.concat(result.pending).filter(Boolean);
    if (failed.length) {
        throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`);
    }
}
