import {
  Accordion as Accord,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { AccordionProps } from "@/types";

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  return (
    <Accord type="single" collapsible>
      {items.map((item) => (
        <AccordionItem
          key={item.value}
          value={item.value}
          className="border rounded-xl mb-5"
        >
          <AccordionTrigger className="accordion-trigger font-normal xl:py-4 lg:py-4 md:py-4 sm:py-5 py-3 xl:px-6 lg:px-6 md:px-6 sm:px-6 px-4 hover:no-underline">
            <div className="accordion-title flex items-center">
              {item.icon && (
                <Image
                  src={item.icon}
                  alt={item.title}
                  className="w-6 h-5 mr-3"
                  width={20}
                  height={20}
                />
              )}
              <p className="xl:text-base lg:text-base md:text-lg sm:text-md text-sm no-underline">{item.title}</p>
            </div>
          </AccordionTrigger>
          <AccordionContent className="xl:text-base lg:text-base md:text-base sm:text-md text-sm py-5 px-6">
            {item.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accord>
  );
};

export default Accordion;
