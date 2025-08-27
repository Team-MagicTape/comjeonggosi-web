interface Props {
  width: number;
  height: number;
  radius: number;
}

const Skeleton: React.FC<Props> = ({ width, height, radius }) => {
  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        borderRadius: `${radius}px`,
        backgroundColor: "#e0e0e0",
        animation: "pulse 1.5s infinite",
      }}
    />
  );
};

export default Skeleton;
