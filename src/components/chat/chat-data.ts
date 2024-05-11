export function generateChats(): {
  id: number;
  userName: string;
  isAdmin: boolean;
  isOwner: boolean;
  message: string;
  time: string;
}[] {
  const chats = [];
  const userNames = [
    "Alice",
    "Bob",
    "Charlie",
    "David",
    "Emma",
    "Frank",
    "Grace",
    "Henry",
    "Ivy",
    "Jack",
  ];
  const messages = [
    "Hello",
    "Hi there",
    "How are you?",
    "Good morning",
    "Good evening",
    "Nice to meet you",
    "What's up?",
    "How's your day?",
    "Long time no see",
  ];

  for (let i = 1; i <= 100; i++) {
    const userName = userNames[Math.floor(Math.random() * userNames.length)];
    const isAdmin = Math.random() < 0.2; // 20% chance of being an admin
    const isOwner = Math.random() < 0.1; // 10% chance of being the owner
    const message = messages[Math.floor(Math.random() * messages.length)];
    const hours = Math.floor(Math.random() * 12); // Random hour (0-11)
    const minutes = Math.floor(Math.random() * 60); // Random minute (0-59)
    const ampm = Math.random() < 0.5 ? "AM" : "PM"; // Random AM/PM
    const time = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")} ${ampm}`;

    chats.push({ id: i, userName, isAdmin, isOwner, message, time });
  }

  return chats;
}
