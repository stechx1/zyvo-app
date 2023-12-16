// Define a type for a single navigation link
export type NavLink = {
    href: string;
    label: string;
  };
  
  // Define a type for the NavColumn component props
  export type NavColumnProps = {
    title: string;
    links: NavLink[];
  };
  