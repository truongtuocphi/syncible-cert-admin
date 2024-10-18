import nodemailer from 'nodemailer';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, phone, company, message } = req.body;

  // Create transporter using your email service credentials
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // Use your email service provider or SMTP
    auth: {
      user: process.env.GMAIL_USER, // Your email address
      pass: process.env.GMAIL_PASS, // Your email password or app password
    },
  });

  try {
    // Send email
    await transporter.sendMail({
      from: `"${name}" <${email}>`, // Sender's email
      to: 'support@syncible.io', // Replace with your receiving email address
      subject: `New Contact Form Submission from ${name}`,
      text: `You have received a new message from your contact form.

      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Company: ${company}
      Message: ${message}`,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Phone:</strong> ${phone}</p>
             <p><strong>Company:</strong> ${company}</p>
             <p><strong>Message:</strong> ${message}</p>`,
    });

    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ message: 'Error sending email' });
  }
}
