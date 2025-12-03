type ContactMessage = {
  id: number;
  submittedAt: string;
  name: string;
  email: string;
  message: string;
  raw: Record<string, any>;
};

// Simple in-memory store (resets when you restart `npm run dev`)
const contactMessages: ContactMessage[] = [];

export async function POST(req: Request) {
  const formData = await req.formData();
  const data = Object.fromEntries(formData.entries());

  const id = contactMessages.length + 1;
  const submittedAt = new Date().toISOString();

  const msg: ContactMessage = {
    id,
    submittedAt,
    name: String(data.name || ""),
    email: String(data.email || ""),
    message: String(data.message || ""),
    raw: data as Record<string, any>,
  };

  contactMessages.push(msg);

  // Log nicely in the Terminal so you can see it
  console.log("=========================================");
  console.log("📨 New CONTACT message received");
  console.log(`ID:           ${msg.id}`);
  console.log(`Submitted at: ${msg.submittedAt}`);
  console.log(`From:         ${msg.name} <${msg.email}>`);
  console.log("Message:");
  console.log(msg.message);
  console.log("--- Full payload ---");
  console.log(data);
  console.log("=========================================");

  // Redirect back to the homepage after submit
  return new Response(null, {
    status: 303,
    headers: {
      Location: "/",
    },
  });
}