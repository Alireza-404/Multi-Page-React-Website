import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { FaChevronRight } from "react-icons/fa";

const ProductsTree = () => {
  const [productsTreeArray, setProductsTreeArray] = useState([
    {
      id: 1,
      label: "Website",
      isOpen: false,
      children: [
        { childrenId: 1_1, label: "Home" },
        { childrenId: 1_2, label: "Pricing" },
        { childrenId: 1_3, label: "About us" },
        {
          childrenId: 1_4,
          label: "Blog",
          children: [
            { childrenId: 1_5, label: "Announcements" },
            { childrenId: 1_6, label: "April lookahead" },
            { childrenId: 1_7, label: "What's new" },
            { childrenId: 1_8, label: "Meet the team" },
          ],
        },
      ],
    },

    {
      id: 2,
      label: "Store",
      isOpen: false,
      children: [
        { childrenId: 2_1, label: "Home" },
        {
          childrenId: 2_2,
          label: "All products",
          children: [
            { childrenId: 2_3, label: "Gadgets" },
            { childrenId: 2_4, label: "Phones" },
            { childrenId: 2_5, label: "Wearables" },
          ],
        },
        { childrenId: 2_6, label: "Bestsellers" },
        { childrenId: 2_7, label: "Sales" },
      ],
    },

    {
      id: 3,
      label: "Contact",
      isOpen: false,
    },

    {
      id: 4,
      label: "Help",
      isOpen: false,
    },
  ]);
  const [activeTree, setActiveTree] = useState<null | number>(null);
  const [activeChild, setActiveChild] = useState<null | number>(null);
  const [activeChild2, setActiveChild2] = useState<null | number>(null);

  const handleTreeClick = (id: number) => {
    setProductsTreeArray((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, isOpen: !item.isOpen }
          : { ...item, isOpen: false }
      )
    );
  };

  return (
    <div
      className="border-2 border-gray-300/50 dark:border-gray-600/40 rounded-md p-4 flex flex-col gap-y-3
      xs:w-[40%] xl:w-full"
    >
      <p className="text-slate-800 dark:text-gray-200 font-semibold text-[15px]">
        Products tree
      </p>

      <div>
        <AnimatePresence>
          {productsTreeArray.map((item) => (
            <div key={item.id} className="select-none">
              <p
                key={item.id}
                className={`text-slate-800 dark:text-gray-200 text-sm flex items-center gap-x-2 font-medium
                hover:bg-gray-200 dark:hover:bg-[#0b0e14] cursor-pointer px-4 py-2 rounded-md transition-all
                duration-200 ${
                  item.isOpen && activeTree === item.id
                    ? "bg-gray-300 dark:bg-[#212733] hover:bg-gray-300 dark:hover:bg-[#212733]"
                    : "bg-transparent"
                }`}
                onClick={() => {
                  setActiveTree((prev) => (prev === item.id ? null : item.id));
                  handleTreeClick(item.id);
                  setActiveChild(null);
                  setActiveChild2(null);
                }}
              >
                {item.id === 1 || item.id === 2 ? (
                  <span
                    className={`text-[11px] text-gray-500 dark:text-gray-400 transition-all duration-200 ${
                      item.id === activeTree ? "rotate-90" : "rotate-0"
                    }`}
                  >
                    <FaChevronRight />
                  </span>
                ) : (
                  <span className="bg-[#027af2] w-1.5 h-1.5 rounded-full"></span>
                )}
                {item.label}
              </p>

              {(item.id === 1 || item.id === 2) && (
                <AnimatePresence initial={false}>
                  {item.isOpen && (
                    <motion.div
                      key={`${item.id}-dropdown`}
                      initial={{ scaleY: 0, opacity: 0 }}
                      animate={{
                        scaleY: 1,
                        opacity: 1,
                        transition: { duration: 0.25, ease: "easeInOut" },
                      }}
                      exit={{
                        scaleY: 0,
                        opacity: 0,
                        transition: { duration: 0.2, ease: "easeInOut" },
                      }}
                      style={{
                        transformOrigin: "top",
                        overflow: "hidden",
                      }}
                      className="flex flex-col gap-y-2 py-2 pl-5"
                    >
                      {item.children?.map((child) => (
                        <React.Fragment key={child.childrenId}>
                          <p
                            className={`text-slate-800 dark:text-gray-200 text-sm flex items-center gap-x-2 font-medium
                          hover:bg-gray-200 dark:hover:bg-[#0b0e14] cursor-pointer px-4 py-2 rounded-md transition-all
                            duration-200 ${
                              child.childrenId === activeChild
                                ? "bg-gray-300 dark:bg-[#212733] hover:bg-gray-300 dark:hover:bg-[#212733]"
                                : "bg-transparent"
                            }`}
                            onClick={() => {
                              setActiveChild((prev) =>
                                prev === child.childrenId
                                  ? null
                                  : child.childrenId
                              );
                              setActiveChild2(null);
                            }}
                          >
                            {child.children ? (
                              <motion.span
                                animate={{
                                  rotate:
                                    child.childrenId === activeChild ? 90 : 0,
                                }}
                                transition={{ duration: 0.2 }}
                                className={`text-[11px] text-gray-500 dark:text-gray-400 transition-all duration-200 ${
                                  child.childrenId === activeChild
                                    ? "rotate-90"
                                    : "rotate-0"
                                }`}
                              >
                                <FaChevronRight />
                              </motion.span>
                            ) : (
                              <span className="bg-green-600 w-1.5 h-1.5 rounded-full"></span>
                            )}
                            {child.label}
                          </p>

                          <AnimatePresence initial={false}>
                            {child.children &&
                              child.childrenId === activeChild && (
                                <motion.div
                                  key={`${child.childrenId}-sub`}
                                  initial={{ scaleY: 0, opacity: 0 }}
                                  animate={{
                                    scaleY: 1,
                                    opacity: 1,
                                    transition: {
                                      duration: 0.25,
                                      ease: "easeInOut",
                                    },
                                  }}
                                  exit={{
                                    scaleY: 0,
                                    opacity: 0,
                                    transition: {
                                      duration: 0.2,
                                      ease: "easeInOut",
                                    },
                                  }}
                                  style={{
                                    transformOrigin: "top",
                                    overflow: "hidden",
                                  }}
                                  className="flex flex-col gap-y-2 py-2 pl-5"
                                >
                                  {child.children.map((child2) => (
                                    <p
                                      key={child2.childrenId}
                                      className={`text-slate-800 dark:text-gray-200 text-sm flex items-center gap-x-2 font-medium
                                    hover:bg-gray-200 dark:hover:bg-[#0b0e14] cursor-pointer px-4 py-2 rounded-md transition-all
                                      duration-200 ${
                                        child2.childrenId === activeChild2
                                          ? "bg-gray-300 dark:bg-[#212733] hover:bg-gray-300 dark:hover:bg-[#212733]"
                                          : "bg-transparent"
                                      }`}
                                      onClick={() =>
                                        setActiveChild2(child2.childrenId)
                                      }
                                    >
                                      <span className="bg-[#027af2] w-1.5 h-1.5 rounded-full"></span>
                                      {child2.label}
                                    </p>
                                  ))}
                                </motion.div>
                              )}
                          </AnimatePresence>
                        </React.Fragment>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProductsTree;
