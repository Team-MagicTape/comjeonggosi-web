import { useEffect, useState } from "react";
import { linkArticles } from "../api/link-articles";
import { Article } from "../types/article";

export const useSidebar = () => {
  const [to, setTo] = useState(0);
  const [before, setBefore] = useState<Article[]>([]);
  const [after, setAfter] = useState<Article[]>([]);

  useEffect(() => {
    if (!to) return;

    const fetchLinks = async () => {
      const beforeArticles = await linkArticles(to, { to, isBefore: true });
      const afterArticles = await linkArticles(to, { to, isBefore: false });
      setBefore(beforeArticles);
      setAfter(afterArticles);
    };

    fetchLinks();
  }, [to]);

  return { setTo, before, after };
};
