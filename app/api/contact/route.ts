import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, budget, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email and message are required." },
        { status: 400 },
      );
    }

    await resend.emails.send({
      from: "Paulcodes <hello@paulcodes.pro>",
      to: "hello@paulcodes.pro",
      subject: `New message from ${name} — Paulcodes`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 2rem; background: #0a0a0a; color: #f0ede8; border-radius: 12px;">
          <h2 style="color: #c8f060; margin-bottom: 1.5rem;">New Contact Message</h2>
          
          <div style="background: #111; border: 1px solid #222; border-radius: 8px; padding: 1.25rem; margin-bottom: 1rem;">
            <p style="margin: 0 0 0.5rem; color: #888; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.08em;">From</p>
            <p style="margin: 0; font-weight: 600;">${name}</p>
          </div>

          <div style="background: #111; border: 1px solid #222; border-radius: 8px; padding: 1.25rem; margin-bottom: 1rem;">
            <p style="margin: 0 0 0.5rem; color: #888; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.08em;">Email</p>
            <a href="mailto:${email}" style="color: #c8f060; text-decoration: none;">${email}</a>
          </div>

          <div style="background: #111; border: 1px solid #222; border-radius: 8px; padding: 1.25rem; margin-bottom: 1rem;">
            <p style="margin: 0 0 0.5rem; color: #888; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.08em;">Budget</p>
            <p style="margin: 0; font-weight: 600;">${budget || "Not specified"}</p>
          </div>

          <div style="background: #111; border: 1px solid #222; border-radius: 8px; padding: 1.25rem; margin-bottom: 1.5rem;">
            <p style="margin: 0 0 0.5rem; color: #888; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.08em;">Message</p>
            <p style="margin: 0; line-height: 1.7;">${message}</p>
          </div>

          <a href="mailto:${email}" style="display: inline-block; background: #c8f060; color: #0a0a0a; padding: 0.75rem 1.5rem; border-radius: 9999px; font-weight: 700; text-decoration: none;">
            Reply to ${name}
          </a>

          <p style="margin-top: 2rem; font-size: 0.75rem; color: #555;">Sent from paulcodes.pro contact form</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to send message." },
      { status: 500 },
    );
  }
}
