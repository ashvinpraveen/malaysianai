import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { google } from "npm:googleapis@126";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface DemoBookingData {
    id: string;
    created_at: string;
    full_name: string;
    email: string;
    company_name: string;
    job_title: string;
    use_case: string;
}

async function syncToGoogleSheets(data: DemoBookingData) {
    try {
        const credentialsBase64 = Deno.env.get("GOOGLE_CREDENTIALS_BASE64");
        if (!credentialsBase64) throw new Error("Google credentials not found");

        const cleanedBase64 = credentialsBase64.replace(/\s/g, '');
        const jsonStr = atob(cleanedBase64);
        const credentials = JSON.parse(jsonStr);

        const sheetId = Deno.env.get("GOOGLE_SHEET_ID");

        const auth = new google.auth.GoogleAuth({
            credentials,
            scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });

        const sheets = google.sheets({ version: "v4", auth });

        const rowData = [
            data.created_at,
            data.full_name,
            data.email,
            data.company_name,
            data.job_title,
            data.use_case,
        ];

        await sheets.spreadsheets.values.append({
            spreadsheetId: sheetId,
            range: "DemoBookings!A:F",
            valueInputOption: "RAW",
            requestBody: {
                values: [rowData],
            },
        });

        return { success: true };
    } catch (error) {
        console.error("Error syncing to Google Sheets:", error);
        throw error;
    }
}

async function sendConfirmationEmail(data: DemoBookingData) {
    try {
        const resendApiKey = Deno.env.get("RESEND_API_KEY");
        if (!resendApiKey) throw new Error("Resend API key not found");

        const response = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${resendApiKey}`,
            },
            body: JSON.stringify({
                from: "PlaceholderCo <demos@placeholder.co>",
                to: [data.email],
                subject: `Demo Request Received - ${data.company_name}`,
                html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #020817;">
            <h2 style="color: #06b6d4;">Hello ${data.full_name},</h2>
            <p>Thank you for your interest in PlaceholderCo! We've received your request for a personalized demo.</p>
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0;">Submission Details:</h3>
              <p><strong>Company:</strong> ${data.company_name}</p>
              <p><strong>Role:</strong> ${data.job_title}</p>
              <p><strong>Use Case:</strong> ${data.use_case}</p>
            </div>
            <p>Our team will review your details and reach out within 24 hours to schedule a time that works for you.</p>
            <p>Best regards,<br>The PlaceholderCo Team</p>
          </div>
        `,
            }),
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(`Resend API error: ${error}`);
        }

        return { success: true };
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
}

serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        const { record } = await req.json();
        const data = record as DemoBookingData;

        console.log("Processing demo booking:", data.id);

        const [sheetsResult, emailResult] = await Promise.allSettled([
            syncToGoogleSheets(data),
            sendConfirmationEmail(data),
        ]);

        const errors = [];
        if (sheetsResult.status === "rejected") errors.push(`Sheets: ${sheetsResult.reason}`);
        if (emailResult.status === "rejected") errors.push(`Email: ${emailResult.reason}`);

        if (errors.length > 0) {
            console.error("Partial failure:", errors);
            return new Response(JSON.stringify({ success: false, errors }), {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 207,
            });
        }

        return new Response(JSON.stringify({ success: true }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
        });
    } catch (error: any) {
        console.error("Error:", error);
        return new Response(JSON.stringify({ success: false, error: error.message }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 500,
        });
    }
});
