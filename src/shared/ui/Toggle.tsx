"use client";

interface Props {
  on: boolean;
  setOn: (on: boolean) => void;
}

const Toggle = ({ on, setOn }: Props) => {
  return (
    <div className={`w-7 h-4 border border-[#DBDBDB] rounded-full ${on ? "bg-primary" : "bg-white"} transition-all relative cursor-pointer`} onClick={() => setOn(!on)}>
      <div className={`w-3 h-3 rounded-full absolute top-[1px] ${on ? "left-[13px] bg-white" : "left-[1px] bg-primary"} transition-all`} />
    </div>
  )
}

export default Toggle