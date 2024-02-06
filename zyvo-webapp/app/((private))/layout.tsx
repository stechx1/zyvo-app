export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='px-5 sm:px-[6%] xl:px-30 xl:py-8 lg:py-8 md:py-8 sm:py-8 py-2 font-Poppins sm:bg-[url("/images/dotted-background.png")] bg-no-repeat'
    
    >
      {children}
    </div>
  );
}
