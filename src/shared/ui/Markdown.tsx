"use client";

import ReactMarkdownPreview from "@uiw/react-markdown-preview";

const Markdown = ({ content }: { content: string }) => {
  return (
    <div data-color-mode="light">
    <ReactMarkdownPreview
      source={content}
      className="wmde-markdown wmde-markdown-color"
    />
    </div>
  );
};

export default Markdown;
