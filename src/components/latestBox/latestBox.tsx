import { FaChevronRight } from "react-icons/fa";

interface Latest {
  id: number;
  type: string;
  title: string;
  description: string;
  profile1: string;
  profile2?: string;
  username1: string;
  username2?: string;
  date: string;
}

const LatestBox = ({ items }: { items: Latest }) => {
  return (
    <div className="flex flex-col justify-between gap-y-4">
      <div className="flex flex-col gap-y-4">
        <span className="text-[#1184f7] text-xs">{items.type}</span>

        <p
          className="group text-slate-800 dark:text-gray-200 font-bold text-lg xl:text-xl line-clamp-2 cursor-pointer
        relative after:absolute after:w-0 after:bg-gray-300/50 dark:after:bg-gray-600/40 after:h-0.5 hover:after:w-full
        after:-bottom-0 after:left-0 after:transition-all after:duration-200 py-1.5 pr-6"
        >
          {items.title}

          <span
            className="text-xs absolute top-1/2 -translate-y-1/2 right-1 invisible group-hover:visible
        transition-all duration-300  opacity-0 group-hover:opacity-100"
          >
            <FaChevronRight className="text-slate-800 dark:text-gray-200" />
          </span>
        </p>

        <p className="text-sm xl:text-[15px] text-gray-500 dark:text-gray-400 line-clamp-2">
          {items.description}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div
          className={`flex items-center ${
            items.profile2 ? "gap-x-6" : "gap-x-2"
          }`}
        >
          <div className="relative">
            <img
              loading="lazy"
              alt={`Latest profile1 _ ID: ${items.id}`}
              className="w-6 h-6 xl:w-8 xl:h-8 rounded-full relative z-20"
              src={items.profile1}
            />
            {items.profile2 && (
              <img
                loading="lazy"
                alt={`Latest profile2 _ ID: ${items.id}`}
                className="w-6 h-6 xl:w-8 xl:h-8 rounded-full absolute left-3.5 top-1/2 z-10 -translate-y-1/2"
                src={items.profile2}
              />
            )}
          </div>

          <div className="flex items-center gap-x-1.5">
            <div className="flex items-center">
              <span className="text-slate-800 dark:text-gray-200 text-xs xl:text-[12.75px] xl:font-medium">
                {items.username1}
              </span>

              {items.username2 && (
                <span className="text-slate-800 dark:text-gray-200">,</span>
              )}
            </div>

            {items.username2 && (
              <span className="text-slate-800 dark:text-gray-200 text-xs xl:text-[12.75px] xl:font-medium">
                {items.username2}
              </span>
            )}
          </div>
        </div>

        <span className="text-xs text-slate-800 dark:text-gray-200 xl:font-medium xl:text-[12.75px]">
          {items.date}
        </span>
      </div>
    </div>
  );
};

export default LatestBox;
