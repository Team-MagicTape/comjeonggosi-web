interface Props {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

const AdminHeader = ({ title, description, action }: Props) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        {description && (
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};

export default AdminHeader;
