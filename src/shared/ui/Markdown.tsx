import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import slugify from "slugify";

const Markdown = ({ content }: { content: string }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => {
          const text = String(children);
          const id = slugify(text, { lower: true, strict: true });

          return (
            <h1 id={id} className="text-3xl font-bold mt-6 mb-4">
              {children}
            </h1>
          );
        },
        h2: ({ children }) => {
          const text = String(children);
          const id = slugify(text, { lower: true, strict: true });
          return (
            <h2 id={id} className="text-2xl font-semibold mt-5 mb-3">
              {children}
            </h2>
          );
        },
        h3: ({ children }) => {
          const text = String(children);
          const id = slugify(text, { lower: true, strict: true });
          return (
            <h3 id={id} className="text-xl font-semibold mt-4 mb-2">
              {children}
            </h3>
          );
        },
        p: ({ children }) => (
          <p className="text-base leading-7 mt-2 mb-2">{children}</p>
        ),
        ul: ({ children }) => (
          <ul className="list-disc pl-6 mt-2 mb-2">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal pl-6 mt-2 mb-2">{children}</ol>
        ),
        li: ({ children }) => <li className="mb-1">{children}</li>,
        a: ({ href, children }) => (
          <a
            href={href}
            className="text-blue-600 underline hover:text-blue-800"
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        ),
        table: ({ children }) => (
          <table className="table-auto border border-gray-300 w-full mt-6 mb-4">
            {children}
          </table>
        ),
        thead: ({ children }) => (
          <thead className="bg-gray-100">{children}</thead>
        ),
        tr: ({ children }) => (
          <tr className="border border-gray-300">{children}</tr>
        ),
        th: ({ children }) => (
          <th className="border border-gray-300 px-4 py-2 text-left">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="border border-gray-300 px-4 py-2">{children}</td>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default Markdown;
