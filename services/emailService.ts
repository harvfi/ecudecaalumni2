import { GoogleGenAI } from "@google/genai";
import { Event } from "../types";

const EMAIL_DRAFT_PROMPT = (event: Event) => `
Draft a professional and highly engaging email announcement for the ECU DECA Alumni chapter.
The tone should be spirited (Go Pirates!), professional, and community-focused.

EVENT DETAILS:
Title: ${event.title}
Date: ${event.date}
Time: ${event.time}
Location: ${event.location}
Description: ${event.description}

STRUCTURE:
1. Subject line: Catchy and Pirate-themed.
2. Greeting: "Dear Pirate Family," or similar.
3. Hook: Mention why this event matters for the alumni chapter.
4. Details: List the logistics clearly.
5. CTA: Encourage them to RSVP on the network site.
6. Sign-off: "Go Pirates!", "The ECU DECA Alumni Board", and mention contact "ecudecaalumni@gmail.com".

Keep it under 200 words.
`;

export const draftAnnouncementEmail = async (event: Event): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: EMAIL_DRAFT_PROMPT(event),
    });

    return response.text || "New Event Updated! Log in to view details and RSVP.";
  } catch (error) {
    console.error("Gemini Email Drafting Error:", error);
    return `New event: ${event.title} is now live on the ECU DECA Alumni site. Check it out for details!`;
  }
};

export const sendEmailViaResend = async (
  to: string | string[],
  subject: string,
  html: string
): Promise<boolean> => {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ to, subject, html }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Email send failed:', error);
      return false;
    }

    const data = await response.json();
    console.log('Email sent successfully:', data);
    return true;
  } catch (error) {
    console.error('Error sending email via Resend:', error);
    return false;
  }
};

export const simulateEmailDispatch = async (count: number): Promise<boolean> => {
  // Simulate network latency for bulk send
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Successfully dispatched mock emails to ${count} subscribers.`);
      resolve(true);
    }, 2000);
  });
};

// ============================================
// CONFIRMATION EMAIL TEMPLATES
// ============================================

/**
 * Send welcome email when a new user joins the network
 */
export const sendWelcomeEmail = async (
  userEmail: string,
  userName: string
): Promise<boolean> => {
  const subject = "Welcome to the ECU DECA Alumni Network! 🏴‍☠️";

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #592A8A 0%, #4A1F75 100%); color: white; padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .header h1 { margin: 0; font-size: 28px; font-weight: bold; }
        .content { background: white; padding: 30px; border: 1px solid #e5e7eb; border-top: none; }
        .button { display: inline-block; background: #FFC107; color: #592A8A; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 20px 0; }
        .footer { background: #f9fafb; padding: 20px; text-align: center; color: #6b7280; font-size: 14px; border-radius: 0 0 8px 8px; }
        .pirate-emoji { font-size: 48px; margin: 10px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="pirate-emoji">🏴‍☠️</div>
          <h1>Welcome Aboard, Pirate!</h1>
        </div>
        <div class="content">
          <p>Hey <strong>${userName}</strong>,</p>
          
          <p>Welcome to the <strong>ECU DECA Alumni Network</strong>! We're thrilled to have you join our community of Pirates making waves across industries.</p>
          
          <p><strong>What's Next?</strong></p>
          <ul>
            <li>🎯 <strong>Complete your profile</strong> to connect with fellow alumni</li>
            <li>📅 <strong>Browse upcoming events</strong> and RSVP to networking opportunities</li>
            <li>💼 <strong>Share your achievements</strong> in the Alumni Hall of Fame</li>
            <li>🤝 <strong>Give back</strong> by mentoring current students</li>
          </ul>
          
          <div style="text-align: center;">
            <a href="https://ecudecaalumni2.vercel.app/" class="button">Explore the Network →</a>
          </div>
          
          <p>Have questions? Reply to this email or reach out to us at <a href="mailto:ecudecaalumni@gmail.com">ecudecaalumni@gmail.com</a>.</p>
          
          <p style="margin-top: 30px;"><strong>Go Pirates!</strong> ⚓<br>
          The ECU DECA Alumni Board</p>
        </div>
        <div class="footer">
          <p>ECU DECA Alumni Network<br>
          East Carolina University | Greenville, NC</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return await sendEmailViaResend(userEmail, subject, html);
};

/**
 * Send RSVP confirmation email with event details
 */
export const sendRSVPConfirmation = async (
  userEmail: string,
  userName: string,
  event: { title: string; date: string; time: string; location: string; description: string }
): Promise<boolean> => {
  const subject = `You're RSVPed for ${event.title}! ⚓`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #592A8A 0%, #4A1F75 100%); color: white; padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .header h1 { margin: 0; font-size: 28px; font-weight: bold; }
        .content { background: white; padding: 30px; border: 1px solid #e5e7eb; border-top: none; }
        .event-card { background: #f9fafb; border-left: 4px solid #FFC107; padding: 20px; margin: 20px 0; border-radius: 4px; }
        .event-detail { margin: 10px 0; }
        .event-detail strong { color: #592A8A; }
        .button { display: inline-block; background: #FFC107; color: #592A8A; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 20px 0; }
        .footer { background: #f9fafb; padding: 20px; text-align: center; color: #6b7280; font-size: 14px; border-radius: 0 0 8px 8px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✅ RSVP Confirmed!</h1>
        </div>
        <div class="content">
          <p>Hey <strong>${userName}</strong>,</p>
          
          <p>You're all set! We're excited to see you at:</p>
          
          <div class="event-card">
            <h2 style="margin-top: 0; color: #592A8A;">${event.title}</h2>
            <div class="event-detail">📅 <strong>Date:</strong> ${event.date}</div>
            <div class="event-detail">🕐 <strong>Time:</strong> ${event.time}</div>
            <div class="event-detail">📍 <strong>Location:</strong> ${event.location}</div>
            <div class="event-detail" style="margin-top: 15px;">
              <strong>About this event:</strong><br>
              ${event.description}
            </div>
          </div>
          
          <p><strong>What to bring:</strong></p>
          <ul>
            <li>Your Pirate spirit! 🏴‍☠️</li>
            <li>Business cards (if you have them)</li>
            <li>An open mind and networking energy</li>
          </ul>
          
          <div style="text-align: center;">
            <a href="https://ecudecaalumni2.vercel.app/" class="button">View Event Details →</a>
          </div>
          
          <p>Need to update your RSVP? Just reply to this email and let us know.</p>
          
          <p style="margin-top: 30px;"><strong>See you there, Pirate!</strong> ⚓<br>
          The ECU DECA Alumni Board<br>
          <a href="mailto:ecudecaalumni@gmail.com">ecudecaalumni@gmail.com</a></p>
        </div>
        <div class="footer">
          <p>ECU DECA Alumni Network<br>
          East Carolina University | Greenville, NC</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return await sendEmailViaResend(userEmail, subject, html);
};

/**
 * Send booking confirmation email (for future use)
 */
export const sendBookingConfirmation = async (
  userEmail: string,
  userName: string,
  bookingDetails: { mentorName: string; date: string; time: string; topic: string }
): Promise<boolean> => {
  const subject = `Booking Confirmed with ${bookingDetails.mentorName}! 📅`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #592A8A 0%, #4A1F75 100%); color: white; padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: white; padding: 30px; border: 1px solid #e5e7eb; border-top: none; }
        .booking-card { background: #f0fdf4; border-left: 4px solid #10b981; padding: 20px; margin: 20px 0; border-radius: 4px; }
        .button { display: inline-block; background: #FFC107; color: #592A8A; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 20px 0; }
        .footer { background: #f9fafb; padding: 20px; text-align: center; color: #6b7280; font-size: 14px; border-radius: 0 0 8px 8px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📅 Booking Confirmed!</h1>
        </div>
        <div class="content">
          <p>Hey <strong>${userName}</strong>,</p>
          
          <p>Your mentoring session is confirmed!</p>
          
          <div class="booking-card">
            <h3 style="margin-top: 0; color: #059669;">Session with ${bookingDetails.mentorName}</h3>
            <p><strong>📅 Date:</strong> ${bookingDetails.date}<br>
            <strong>🕐 Time:</strong> ${bookingDetails.time}<br>
            <strong>💡 Topic:</strong> ${bookingDetails.topic}</p>
          </div>
          
          <p><strong>Prepare for your session:</strong></p>
          <ul>
            <li>Review your questions ahead of time</li>
            <li>Bring specific challenges you'd like to discuss</li>
            <li>Be ready to take notes</li>
          </ul>
          
          <div style="text-align: center;">
            <a href="https://ecudecaalumni2.vercel.app/" class="button">View Booking Details →</a>
          </div>
          
          <p style="margin-top: 30px;"><strong>Go Pirates!</strong> ⚓<br>
          The ECU DECA Alumni Board</p>
        </div>
        <div class="footer">
          <p>ECU DECA Alumni Network</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return await sendEmailViaResend(userEmail, subject, html);
};

/**
 * Send plan selection confirmation email (for future use)
 */
export const sendPlanSelectionConfirmation = async (
  userEmail: string,
  userName: string,
  planName: string
): Promise<boolean> => {
  const subject = `Welcome to ${planName}! 🎯`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #592A8A 0%, #4A1F75 100%); color: white; padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: white; padding: 30px; border: 1px solid #e5e7eb; border-top: none; }
        .plan-badge { background: #FFC107; color: #592A8A; padding: 8px 16px; border-radius: 20px; font-weight: bold; display: inline-block; margin: 10px 0; }
        .button { display: inline-block; background: #FFC107; color: #592A8A; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 20px 0; }
        .footer { background: #f9fafb; padding: 20px; text-align: center; color: #6b7280; font-size: 14px; border-radius: 0 0 8px 8px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Plan Activated!</h1>
        </div>
        <div class="content">
          <p>Hey <strong>${userName}</strong>,</p>
          
          <p>Congratulations! You've successfully selected:</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <div class="plan-badge">${planName}</div>
          </div>
          
          <p><strong>What's included:</strong></p>
          <ul>
            <li>Access to exclusive alumni events</li>
            <li>Priority networking opportunities</li>
            <li>Mentorship program enrollment</li>
            <li>Career resources and job board</li>
          </ul>
          
          <div style="text-align: center;">
            <a href="https://ecudecaalumni2.vercel.app/" class="button">Get Started →</a>
          </div>
          
          <p>Questions about your plan? We're here to help at <a href="mailto:ecudecaalumni@gmail.com">ecudecaalumni@gmail.com</a>.</p>
          
          <p style="margin-top: 30px;"><strong>Go Pirates!</strong> ⚓<br>
          The ECU DECA Alumni Board</p>
        </div>
        <div class="footer">
          <p>ECU DECA Alumni Network</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return await sendEmailViaResend(userEmail, subject, html);
};