export type TimelineLevel = "year" | "month" | "day";

export interface TimelinePost {
  id: string;
  content: string;
  timestamp: Date;
  type: "text" | "image" | "video";
  likes?: number;
  comments?: number;
  formattedDate: string; // Add this field
}

export interface TimelineItem {
  id: number;
  title: string;
  description: string;
  date: Date;
  children?: TimelineItem[];
  posts?: TimelinePost[];
}

export interface TimelineDataStore {
  years: TimelineItem[];
  currentYear: number;
  currentMonth: number;
  currentDay: number;
}
