import ReactMarkdown from "react-markdown";
import slugify from "slugify";

const Markdown = ({ content }: { content: string }) => {
  return (
    <ReactMarkdown
      components={{
        h1: ({ children }) => {
          const text = String(children);
          const id = slugify(text, { lower: true, strict: true });
          return <h1 id={id} className="text-3xl font-bold mt-6">{children}</h1>;
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default Markdown;