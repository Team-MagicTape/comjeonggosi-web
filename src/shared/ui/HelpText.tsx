type Props = {
  text: string;
};

const HelpText = ({ text }: Props) => {
  return (
    <div className="text-gray-400 text-sm text-center mt-4 space-y-1">
      {text}
    </div>
  );
};

export default HelpText;
