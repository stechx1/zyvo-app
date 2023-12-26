export interface AccordionItem {
  value: string;
  title: string;
  icon?: string;
  content: string;
}

export interface AccordionProps {
  items: AccordionItem[];
}
