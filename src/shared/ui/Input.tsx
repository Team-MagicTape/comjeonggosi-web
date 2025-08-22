'use client';

import { InputHTMLAttributes } from 'react';

const Input = ({ ...props }: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      {...props}
      className="block w-full px-3 py-2 border border-border rounded-item placeholder-gray-400 outline-none sm:text-sm"
    />
  );
}

export default Input