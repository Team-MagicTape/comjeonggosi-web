import { Article } from "../types/article";

interface Props {
  data: Article[];
  title: string;
}

const ArticleSidebar = ({ data, title }: Props) => {
  return (
    <div className="xl:w-72 w-full h-fit bg-white border border-border rounded-2xl p-6 flex flex-col gap-4 xl:sticky xl:top-32">
      <p className="font-bold text-xl">{title}</p>
      <hr className="border border-primary" />
      <ul className="flex flex-col gap-2">
        {data.map((item) => (
          <li key={item.id} className={"pl-4 text-gray-600"}>
            <a
              href={`/articles/${item.id}`}
              className="text-sm hover:underline block"
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticleSidebar;
