import { TimelinePost } from "../types/timeline";

// Add date formatting utilities
const dateFormatOptions: Intl.DateTimeFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
};

function formatPostDate(date: Date): string {
  return date.toLocaleDateString("en-US", dateFormatOptions);
}

const postTemplates = [
  "Had a great day at {location}!",
  "Meeting with {person} went well",
  "Enjoying {activity} with friends",
  "Making progress on {project}",
  "Celebrated {event} today",
];

const activities = ["coding", "reading", "hiking", "gaming", "cooking"];
const locations = ["park", "office", "cafe", "gym", "home"];
const people = ["team", "clients", "family", "friends", "colleagues"];
const projects = [
  "Timeline App",
  "Portfolio",
  "Blog",
  "Side Project",
  "Research",
];
const events = [
  "birthday",
  "anniversary",
  "milestone",
  "achievement",
  "launch",
];

function generateRandomPost(date: Date): TimelinePost {
  const template =
    postTemplates[Math.floor(Math.random() * postTemplates.length)];
  const activity = activities[Math.floor(Math.random() * activities.length)];
  const location = locations[Math.floor(Math.random() * locations.length)];
  const person = people[Math.floor(Math.random() * people.length)];
  const project = projects[Math.floor(Math.random() * projects.length)];
  const event = events[Math.floor(Math.random() * events.length)];

  const formattedDate = formatPostDate(date);
  const content = `${template
    .replace("{activity}", activity)
    .replace("{location}", location)
    .replace("{person}", person)
    .replace("{project}", project)
    .replace("{event}", event)}`;

  return {
    id: `post-${date.getTime()}-${Math.random().toString(36).substr(2, 9)}`,
    content,
    timestamp: date,
    type: "text",
    likes: Math.floor(Math.random() * 100),
    comments: Math.floor(Math.random() * 20),
    formattedDate, // Add formatted date to post object
  };
}

export function generateDayPosts(
  date: Date,
  count: number = 3
): TimelinePost[] {
  const posts: TimelinePost[] = [];
  for (let i = 0; i < count; i++) {
    const postDate = new Date(date);
    postDate.setHours(Math.floor(Math.random() * 24));
    posts.push(generateRandomPost(postDate));
  }
  return posts.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
}
