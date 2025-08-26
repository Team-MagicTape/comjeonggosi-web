import { Heading } from "../types/heading";

export const extractHeadings = (markdown: string): Heading[] => {
  const headingRegex = /^(#{1,2}) (.+)$/gm;
  const headings: Heading[] = [];

  let match;
  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length; // # → 1, ## → 2
    const text = match[2].trim();
    const href = text.toLowerCase().replace(/\s+/g, "-");
    headings.push({ text, level, href });
    console.log(headings);
  }

  return headings;
};
