interface Props {
  headings: { text: string; id: string; level: number }[];
}

const ArticleSidebar = ({ headings }: Props) => {
  return (
    <div className="w-72 h-fit bg-white border border-border rounded-2xl xl:p-6 flex flex-col gap-4 sticky top-32">
      <p className="font-bold text-xl">목차</p>
      <hr className="border border-primary" />
      <ul className="flex flex-col gap-2">
        {headings.map((item) => (
          <li key={item.id} className={item.level === 2 ? "pl-4 text-gray-600" : ""}>
            <a href={`#${item.id}`} className="text-sm hover:underline block">
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticleSidebar;
