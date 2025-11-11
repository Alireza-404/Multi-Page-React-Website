import { AnimatePresence, motion } from "framer-motion";

const Overlay = ({
  className,
  click,
}: {
  className: string;
  click?: React.MouseEventHandler<HTMLDivElement>;
}) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.3 }}
        id="overlay"
        className={`bg-black/40 dark:bg-black/60 inset-0 z-40 ${
          className || ""
        }`}
        onClick={click}
      ></motion.div>
    </AnimatePresence>
  );
};

export default Overlay;
