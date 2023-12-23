export default function PrivateLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="px-3 sm:px-10 md:px-10 lg:px-20 xl:px-32 py-8">
        {children}
      </div>
    );
  }