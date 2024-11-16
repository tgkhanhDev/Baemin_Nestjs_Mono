export default function DetailFoodLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <section className="relative top-20 w-full" >{children}</section>
    );
  }