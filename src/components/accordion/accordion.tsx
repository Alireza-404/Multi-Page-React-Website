import { useEffect, useState } from "react";
import AccordionItem from "./accordionItem";
import AOS from "aos";
import "aos/dist/aos.css";

const Accordion = () => {
  const [accordionArray, setAccordionArray] = useState([
    {
      id: 1,
      question:
        "How do I contact customer support if I have a question or issue?",
      description:
        "You can reach our customer support team by emailing support@email.com or calling our toll-free number. We're here to assist you promptly.",
      isOpen: false,
    },
    {
      id: 2,
      question: "Can I return the product if it doesn't meet my expectations?",
      description:
        "Absolutely! We offer a hassle-free return policy. If you're not completely satisfied, you can return the product within [number of days] days for a full refund or exchange.",
      isOpen: false,
    },
    {
      id: 3,
      question: "What makes your product stand out from others in the market?",
      description:
        "Our product distinguishes itself through its adaptability, durability, and innovative features. We prioritize user satisfaction and continually strive to exceed expectations in every aspect.",
      isOpen: false,
    },
    {
      id: 4,
      question: "Is there a warranty on the product, and what does it cover?",
      description:
        "Yes, our product comes with a [length of warranty] warranty. It covers defects in materials and workmanship. If you encounter any issues covered by the warranty, please contact our customer support for assistance.",
      isOpen: false,
    },
  ]);

  const openAccordion = (id: number) => {
    setAccordionArray((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isOpen: !item.isOpen } : item
      )
    );
  };

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div
      className="flex flex-col border-2 border-gray-300/50 dark:border-gray-600/40 rounded-md mt-7 divide-y
    divide-gray-300/50 dark:divide-gray-600/40 xl:mt-14 xl:max-w-[1280px] xl:mx-auto"
      data-aos="fade-right"
    >
      {accordionArray.map((item) => (
        <AccordionItem
          key={item.id}
          item={item}
          isOpen={item.isOpen}
          toggle={openAccordion}
        />
      ))}
    </div>
  );
};

export default Accordion;
