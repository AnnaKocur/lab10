import { ReactNode } from "react";

export default function ProductListLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6 mt-[30px] px-6">
      {children}
    </div>
  );
}
