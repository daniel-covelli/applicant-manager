interface LineBreakProps {
  color?: string;
  width?: string;
  height?: string;
  className?: string;
}

const LineBreak: React.FC<LineBreakProps> = ({
  color = "bg-gray-200",
  width = "w-full",
  height = "h-px",
  className = "",
}) => {
  return (
    <div
      className={`${color} ${width} ${height} my-4 ${className}`}
      role="separator"
      aria-orientation="horizontal"
    />
  );
};

export default LineBreak;
