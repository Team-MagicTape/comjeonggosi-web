import { Category } from "@/entities/category/types/category";
import { Article } from "../types/article";

export const CATEGORIES: Category[] = [
  { id: 1, name: "Technology", description: "Latest in tech and gadgets" },
  { id: 2, name: "Health", description: "Well-being and healthcare topics" },
  { id: 3, name: "Travel", description: "Explore the world and destinations" },
];

export const ARTICLES: Article[] = [
  {
    id: 1,
    title: "Top 5 JavaScript Frameworks in 2025",
    content: "Discover the most popular JavaScript frameworks developers use today...",
    category: CATEGORIES[0],
  },
  {
    id: 2,
    title: "How to Stay Fit with a Busy Schedule",
    content: "Here are practical fitness tips for people with limited time...",
    category: CATEGORIES[1],
  },
  {
    id: 3,
    title: "Hidden Gems of Southeast Asia",
    content: "Check out lesser-known travel destinations in Southeast Asia...",
    category: CATEGORIES[2],
  },
  {
    id: 4,
    title: "AI in Everyday Life",
    content: "How artificial intelligence is becoming part of our daily routines...",
    category: CATEGORIES[0],
  },
  {
    id: 5,
    title: "Hidden Gems of Southeast Asia",
    content: "Check out lesser-known travel destinations in Southeast Asia...",
    category: CATEGORIES[2],
  },
  {
    id: 6,
    title: "AI in Everyday Life",
    content: "How artificial intelligence is becoming part of our daily routines...",
    category: CATEGORIES[0],
  },
];