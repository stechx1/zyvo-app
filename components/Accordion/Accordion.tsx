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
          <AccordionTrigger className="accordion-trigger font-normal py-5 px-6 hover:no-underline">
            <div className="accordion-title flex items-center">
              {item.icon && (
                <Image
                  src={item.icon}
                  alt={item.title}
                  className="w-5 h-5 mr-3"
                  width={20}
                  height={20}
                />
              )}
              <p className="text-[14px] sm:text-lg no-underline">{item.title}</p>
            </div>
          </AccordionTrigger>
          <AccordionContent className="text-[14px] sm:text-lg py-5 px-6">
            {item.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accord>
  );
};

export default Accordion;
