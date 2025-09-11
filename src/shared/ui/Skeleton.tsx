import React from "react";

interface Props {
  width?: number | string;
  height?: number | string;
  radius?: number;
  className?: string;
}

const Skeleton = ({
  width = "100%",
  height = 20,
  radius = 4,
  className = "",
}: Props) => {
  const getStyleValue = (value: number | string) =>
    typeof value === "number" ? `${value}px` : value;

  return (
    <div
      className={`skeleton-loader ${className}`}
      style={{
        width: getStyleValue(width),
        height: getStyleValue(height),
        borderRadius: `${radius}px`,
        backgroundColor: "#e0e0e0",
        backgroundImage:
          "linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)",
        backgroundSize: "200% 100%",
        animation: "skeleton-loading 1.5s infinite",
      }}
    />
  );
};

export default Skeleton;
