import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";

interface AccordionItemInterface {
  id: number;
  question: string;
  description: string;
}

const AccordionItem = ({
  item,
  isOpen,
  toggle,
}: {
  item: AccordionItemInterface;
  isOpen: boolean;
  toggle: (id: number) => void;
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen]);

  return (
    <div className="flex flex-col">
      <div
        className="flex justify-between gap-x-3 items-center font-medium p-3 xs:p-5 cursor-pointer select-none
        bg-transparent "
        onClick={() => toggle(item.id)}
      >
        <p className="text-slate-800 dark:text-gray-200 text-sm xs:text-[15px] xl:text-[17px]">
          {item.question}
        </p>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <FaChevronDown className="text-slate-800 dark:text-gray-200" />
        </motion.div>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: height, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.3 },
              opacity: { duration: 0.2 },
            }}
            className="px-3 overflow-hidden"
          >
            <div
              ref={contentRef}
              className="py-3 xl:pt-1 text-sm xs:text-[15px] text-slate-800 dark:text-gray-300 xl:text-base xs:px-2
              lg:w-[900px]"
            >
              {item.description}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AccordionItem;
