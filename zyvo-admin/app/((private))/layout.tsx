export default function PrivateLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="px-8 sm:px-14 md:px-20 lg:px-20 xl:px-32 py-8">
        {children}
      </div>
    );
  }