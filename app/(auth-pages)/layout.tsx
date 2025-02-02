export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-5xl flex flex-col gap-12 justify-center items-center mx-auto p-12">
      {children}
    </div>
  );
}
