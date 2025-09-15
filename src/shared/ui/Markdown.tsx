"use client";

import ReactMarkdownPreview from "@uiw/react-markdown-preview";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

const Markdown = ({ content }: { content: string }) => {
  return (
    <div
      data-color-mode="light"
      className="
        wmde-markdown
        wmde-markdown-color
        [&_h1]:text-xl
        [&_h2]:text-lg
        [&_h3]:text-base
        [&_h4]:text-sm
        [&_p]:text-sm
        [&_ul]:text-xs
        [&_li]:text-xs
        [&_li]:list-disc
        [&_ol]:text-xs
        [&_hr]:!h-0.5
        [&_hr]:!border-0

        xl:[&_h1]:text-3xl
        xl:[&_h2]:text-2xl
        xl:[&_h3]:text-xl
        xl:[&_h4]:text-lg
        xl:[&_p]:text-base
        xl:[&_ul]:text-base
        xl:[&_li]:text-base
        xl:[&_ol]:text-base
      "
    >
      <ReactMarkdownPreview
        source={content}
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
      />
    </div>
  );
};

export default Markdown;
