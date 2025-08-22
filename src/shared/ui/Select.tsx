'use client';

import { ChevronDown } from 'lucide-react';
import { useSelect } from '../model/useSelect';

interface Props {
  data: string[];
  onChange: (value: string) => void;
  value: string;
}

const Select = ({ data, onChange, value }: Props) => {
  const { viewOption, toggleViewOption, closeReq } = useSelect(); 

  return (
    <div
      className="w-full relative bg-white border border-border rounded-item px-4 py-2 flex items-center justify-between"
      onClick={toggleViewOption}
    >
      <p>{value}:00</p>
      <ChevronDown strokeWidth={1} className={`${viewOption ? "rotate-180" : ""} transition-transform`} />
      {
        viewOption && (
          <div className={`w-full overflow-hidden absolute left-0 top-12 flex flex-col bg-white rounded-item border border-border ${closeReq ? "dropdown-animate-close" : "dropdown-animate-open"}`}>
            {data.map((item, idx) => (
              <span key={idx} onClick={() => onChange(item)} className='py-2 px-2 hover:bg-bg transition-colors cursor-pointer'>{item}:00</span>
            ))}
          </div>
        )
      }
    </div>
  );
}

export default Select;