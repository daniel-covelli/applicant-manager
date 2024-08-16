import { type PropsWithChildren } from "react";

const Card = ({
  title,
  footer: Footer,
  data,
}: {
  title?: string;
  footer: React.ComponentType;
  data: { label: string; value: string }[];
}) => {
  return (
    <div className="flex w-full flex-col gap-2 rounded border border-gray-200 bg-white p-4">
      {title && <p className="font-semibold">{title}</p>}
      <div className="flex flex-row gap-6">
        {data.map(({ label, value }) => (
          <div key={label}>
            <p className="text-xs text-gray-600">{label}</p>
            <p className="text-sm">{value}</p>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <Footer />
      </div>
    </div>
  );
};

export const CardGrid = ({ children }: PropsWithChildren) => {
  return (
    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
      {children}
    </div>
  );
};

export default Card;
