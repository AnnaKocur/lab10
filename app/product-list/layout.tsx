export default function ProductListLayout({
  children,
  products,
  discounts,
  modal,
}: {
  children: React.ReactNode;
  products: React.ReactNode;
  discounts: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6 mt-[30px] px-6">
      {modal}

      {discounts}

      {children}
    </div>
  );
}
