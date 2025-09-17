interface Props {
  children: React.ReactNode;
  className?: string;
}

const AdminCard = ({ children, className = "" }: Props) => {
  return (
    <div className={`bg-white border border-gray-100 rounded-lg ${className}`}>
      {children}
    </div>
  );
};

export default AdminCard;
