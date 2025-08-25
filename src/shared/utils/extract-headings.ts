import slugify from "slugify";
import { Heading } from "../types/heading";

export const extractHeadings = (markdown: string): Heading[] => {
  const headingRegex = /^# (.+)$/gm;
  const headings: Heading[] = [];

  let match;
  while ((match = headingRegex.exec(markdown)) !== null) {
    const text = match[1].trim();
    const id = slugify(text, { lower: true, strict: true });
    headings.push({ text, id });
  }

  return headings;
};
