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
            <h1 id={id} className="text-3xl font-bold mt-6">
              {children}
            </h1>
          );
        },
        table: ({ children }) => (
          <table className="table-auto border border-gray-300 w-full mt-6">
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