import { Resend } from "resend";
import "dotenv/config"

const resend = new Resend(process.env.RESEND_API_KEY || "re_your_api_key")

interface EmailParams {
    to: string,
    body: string
}

export async function Mailer({ to, body }: EmailParams) {
    try {
        // console.log(`Sending email to ${to}`);
        console.log(typeof (to), to)
        console.log(typeof (body), body)
        await resend.emails.send({
            from: "Airflow <onboarding@resend.dev>",
            to: to,
            subject: "Automation zap triggered!",
            text: body
        })

        console.log(`Email successfully delivered to ${to}! ✅`);
        return { success: true };

    } catch (error: any) {
        console.error("failed to mail:", error);
        return { success: false, error: error };
    }
}
