import { motion } from "framer-motion";

type Category = {
  id: number;
  type: string;
  title: string;
  description: string;
  src?: string;
  profile1?: string;
  profile2?: string;
  username1?: string;
  username2?: string;
  date: string;
};

interface Props {
  category: Category;
  activeCategoriesButton: number;
}

const CategoryBox = ({ category, activeCategoriesButton }: Props) => {
  return (
    <motion.div
      className={`rounded-md overflow-hidden border-2 border-gray-300/50 dark:border-gray-600/40 flex flex-col
        cursor-pointer ${
          activeCategoriesButton === 3 || activeCategoriesButton === 5
            ? "h-fit"
            : "h-auto"
        }`}
      key={`${category.id}_${activeCategoriesButton}`}
      initial={{ opacity: 0, y: -60 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {category.src && (
        <img
          loading="lazy"
          src={category.src}
          alt={`Category image ${category.id}`}
          className={`object-cover w-full ${
            category.id === 3 || category.id === 6 ? "h-56 xl:h-60" : "h-auto"
          }`}
        />
      )}

      <div
        className={`flex flex-col justify-between p-3 ${
          activeCategoriesButton === 3 || activeCategoriesButton === 5
            ? "flex-grow-0"
            : "flex-grow"
        }`}
      >
        <div className="flex flex-col gap-y-3">
          <p className="text-[#1184f7] text-xs">{category.type}</p>

          <p className="text-slate-800 dark:text-gray-200 font-bold text-lg xl:text-xl">
            {category.title}
          </p>

          <p className="text-sm xl:text-[15px] text-gray-500 dark:text-gray-400 line-clamp-2">
            {category.description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-6 xl:mt-14">
          <div
            className={`flex items-center ${
              category.profile2 ? "gap-x-6" : "gap-x-2"
            }`}
          >
            <div className="relative">
              <img
                loading="lazy"
                src={category.profile1}
                alt={`Blog profile1 _ ID: ${category.id}`}
                className="w-6 h-6 xl:w-8 xl:h-8 rounded-full relative z-20"
              />
              {category.profile2 && (
                <img
                  loading="lazy"
                  src={category.profile2}
                  alt={`Blog profile2 _ ID: ${category.id}`}
                  className="w-6 h-6 xl:w-8 xl:h-8 rounded-full absolute left-3.5 top-1/2 z-10 -translate-y-1/2"
                />
              )}
            </div>

            <div className="flex items-center gap-x-1.5">
              <div className="flex items-center">
                <span className="text-slate-800 dark:text-gray-200 text-xs xl:text-[12.75px] xl:font-medium">
                  {category.username1}
                </span>

                {category.username2 && (
                  <span className="text-slate-800 dark:text-gray-200">,</span>
                )}
              </div>

              {category.username2 && (
                <span className="text-slate-800 dark:text-gray-200 text-xs xl:text-[12.75px] xl:font-medium">
                  {category.username2}
                </span>
              )}
            </div>
          </div>

          <span className="text-xs text-slate-800 dark:text-gray-200 xl:font-medium xl:text-[12.75px]">
            {category.date}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryBox;
