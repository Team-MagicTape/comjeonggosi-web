import { Article } from "../types/article";
import { useSidebar } from "../model/useSidebar";

interface Props {
  data: Article[];
  title: string;
  id: number;
}

const ArticleSidebar = ({ data, title, id }: Props) => {
  const { before, after, setTo } = useSidebar();
  setTo(id);

  return (
    <div className="xl:w-72 w-full h-fit bg-white border border-border rounded-2xl p-6 flex flex-col gap-4 xl:sticky xl:top-32">
      <p className="font-bold text-xl">{title}</p>
      <hr className="border border-primary" />
      <p>같은 카테고리</p>
      <ul className="flex flex-col gap-2">
        {data.map((item) => (
          <li key={item.id} className="pl-4 text-gray-600">
            <a
              href={`/articles/${item.id}`}
              className="text-sm hover:underline block"
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
      <hr className="border border-primary" />
      <p>이 글을 읽기 전에 읽으면 좋은 글</p>
      <ul>
        {before.map((article) => (
          <li key={article.id}>
            <a
              href={`/articles/${article.id}`}
              className="text-sm hover:underline"
            >
              {article.title}
            </a>
          </li>
        ))}
      </ul>
      <hr />
      <p>이 글을 읽은 후에 읽으면 좋은 글</p>
      <ul>
        {after.map((article) => (
          <li key={article.id}>
            <a
              href={`/articles/${article.id}`}
              className="text-sm hover:underline"
            >
              {article.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticleSidebar;
