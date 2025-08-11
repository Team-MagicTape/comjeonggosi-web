'use client';

import { SelectHTMLAttributes } from 'react';

const Select = ({ ...props }: SelectHTMLAttributes<HTMLSelectElement>) => {
  return (
    <select
      {...props}
      className="mt-1 block w-full h-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    />
  );
}

export default Select;