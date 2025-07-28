"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useLoadingStore } from "../model/useLoadingStore";

interface Props { 
  href: string; 
  children: React.ReactNode;
  className: string;
	onClick?: () => void;
}

const CustomLink = ({ href, children, className, onClick }: Props) => {
  const pathname = usePathname();
	const searchParams = useSearchParams();
  const { setIsLoading } = useLoadingStore();

	return (
		<Link
			href={href}
			onClick={(e) => {
				if (`${pathname}/?${searchParams.toString()}` !== href) setIsLoading(true); else e.preventDefault();
				onClick && onClick();
			}}
			className={className}
		>
			{children}
		</Link>
	);
};

export default CustomLink;
