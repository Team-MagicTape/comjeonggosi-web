'use client';

import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isFullWidth?: boolean;
  className?: string;
}

const Button = ({ children, isFullWidth = false, className, ...props }: Props) => {
  return (
    <button
      {...props}
      className={className ?? `flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary cursor-pointer ${isFullWidth && "w-full"}`}
    >
      {children}
    </button>
  );
}

export default Button;