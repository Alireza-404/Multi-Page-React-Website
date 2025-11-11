import { useState } from "react";
import { FaCheck, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import type { DetailsDataType } from "../../types/detailType";
import { DetailsData } from "../../data/detailsData";
import { Bar, ComposedChart, ResponsiveContainer, Tooltip } from "recharts";
import { DetailChartCustomTooltip } from "../customTooltips/customTooltips";

const Details = () => {
  const [detailsData, setDetailsData] =
    useState<DetailsDataType[]>(DetailsData);
  const showDetailPages = 12;
  const [currentPage, setCurrentPage] = useState<number>(1);

  const startIndex = (currentPage - 1) * showDetailPages;
  const endIndex = currentPage * showDetailPages;
  const slicedDetailsData = detailsData.slice(startIndex, endIndex);

  const allChecked = detailsData.every((item) => item.isChecked);

  const allSelectChange = () => {
    const newState = !allChecked;

    const newData = detailsData.map((detail) => ({
      ...detail,
      isChecked: newState,
    }));
    setDetailsData(newData);
  };

  return (
    <div
      className="flex flex-col border-2 border-gray-300/50
        dark:border-gray-600/40 rounded-md"
    >
      <div className="scrollbar-hide overflow-x-auto flex flex-col">
        <div
          className="px-4 py-2 bg-gray-200 dark:bg-[#0C1017] flex items-center gap-x-2.5 w-fit select-none
        xl:min-w-full"
        >
          {/* Page Title */}
          <div className="flex items-center gap-x-7 w-64 flex-shrink-0">
            <div className="relative flex items-center justify-center">
              <input
                type="checkbox"
                onChange={allSelectChange}
                checked={allChecked}
                id="check-all-details"
                className="appearance-none w-[21px] h-[21px] rounded-md border-2 border-gray-400/50 dark:border-gray-600/40
              checked:bg-[#026bd4] transition-all duration-200"
              />
              <label className="absolute z-20" htmlFor="check-all-details">
                <FaCheck
                  className={`text-gray-200 text-xs transition-all duration-200
                 ${allChecked ? "opacity-100 visible" : "invisible opacity-0"}`}
                />
              </label>
            </div>

            <p className="text-slate-800 dark:text-gray-200 font-medium text-[15px]">
              Page Title
            </p>
          </div>

          {/* Status */}
          <div className="w-24 line-clamp-1">
            <p className="text-slate-800 dark:text-gray-200 font-medium text-[15px]">
              Status
            </p>
          </div>

          {/* Users */}
          <div className="w-20 line-clamp-1">
            <p className="text-slate-800 dark:text-gray-200 font-medium text-[15px]">
              Users
            </p>
          </div>

          {/* Event Count */}
          <div className="w-24 line-clamp-1">
            <p className="text-slate-800 dark:text-gray-200 font-medium text-[15px]">
              Event Count
            </p>
          </div>

          {/* Views per User */}
          <div className="w-24 line-clamp-1 ml-3">
            <p className="text-slate-800 dark:text-gray-200 font-medium text-[15px]">
              Views per User
            </p>
          </div>

          {/* Average Time */}
          <div className="w-24 line-clamp-1 ml-3">
            <p className="text-slate-800 dark:text-gray-200 font-medium text-[15px]">
              Average Time
            </p>
          </div>

          {/* Daily Conversions */}
          <div className="text-nowrap ml-5 w-32">
            <p className="text-slate-800 dark:text-gray-200 font-medium text-[15px]">
              Daily Conversions
            </p>
          </div>
        </div>

        <div
          className="flex flex-col min-w-fit select-none divide-y-2 divide-gray-300/50 dark:divide-gray-600/40
          xl:w-auto"
        >
          {slicedDetailsData.map((details) => (
            <div
              className="px-4 py-2 bg-transparent flex items-center gap-x-2.5"
              key={details.id}
            >
              {/* Page Title */}
              <div className="flex items-center gap-x-7 w-64 flex-shrink-0">
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    id={`checkbox-${details.id}`}
                    checked={details.isChecked}
                    onChange={() =>
                      setDetailsData((prev) =>
                        prev.map((item) =>
                          details.id === item.id
                            ? { ...item, isChecked: !item.isChecked }
                            : item
                        )
                      )
                    }
                    className="appearance-none w-[21px] h-[21px] rounded-md border-2 border-gray-300/50 dark:border-gray-600/40
              checked:bg-[#026bd4] transition-all duration-200"
                  />
                  <label
                    className="absolute z-20"
                    htmlFor={`checkbox-${details.id}`}
                  >
                    <FaCheck
                      className={`text-gray-200 text-xs transition-all duration-200
                 ${
                   details.isChecked
                     ? "opacity-100 visible"
                     : "invisible opacity-0"
                 }`}
                    />
                  </label>
                </div>

                <p className="text-slate-800 dark:text-gray-200 font-medium text-sm line-clamp-1">
                  {details.pageTitle}
                </p>
              </div>

              {/* Status */}
              <div className="w-24 line-clamp-1">
                <p
                  className={`font-medium text-xs w-fit ${
                    details.status === "Online"
                      ? `rounded-full bg-green-50 text-green-600 font-bold border px-2 py-0.5
                   border-green-600/30 dark:bg-green-600/10 dark:text-green-400`
                      : `rounded-full bg-gray-50 text-gray-500 font-bold border px-2 py-0.5
                   border-gray-600/30 dark:bg-gray-400/10 dark:text-gray-300`
                  }`}
                >
                  {details.status}
                </p>
              </div>

              {/* Users */}
              <div className="w-20 line-clamp-1">
                <p className="text-slate-800 dark:text-gray-200 font-medium text-sm">
                  {details.users}
                </p>
              </div>

              {/* Event Count */}
              <div className="w-24 line-clamp-1">
                <p className="text-slate-800 dark:text-gray-200 font-medium text-sm">
                  {details.eventCount}
                </p>
              </div>

              {/* Views per User */}
              <div className="w-24 line-clamp-1 ml-3">
                <p className="text-slate-800 dark:text-gray-200 font-medium text-sm">
                  {details.viewsPerUser}
                </p>
              </div>

              {/* Average Time */}
              <div className="w-24 line-clamp-1 ml-3">
                <p className="text-slate-800 dark:text-gray-200 font-medium text-sm">
                  {details.averageTime}
                </p>
              </div>

              {/* Daily Conversions */}
              <div className="text-nowrap ml-5 w-32">
                <ResponsiveContainer width={128} height={24}>
                  <ComposedChart data={details.dailyConversions}>
                    <Tooltip
                      content={DetailChartCustomTooltip}
                      wrapperStyle={{
                        zIndex: 9999,
                      }}
                    />

                    <Bar dataKey={"conversion"} fill="#026BD4" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 py-2 bg-gray-200 dark:bg-[#0C1017] flex items-center justify-end gap-x-2.5">
        <span className="text-slate-800 dark:text-gray-200 font-semibold text-sm lg:text-[15px]">
          {currentPage === 1 ? startIndex + 1 : startIndex} _ {endIndex}
        </span>

        <div
          className={`w-8 h-8 rounded-md border-2 border-gray-300/50 dark:border-gray-600/40 flex items-center
          justify-center text-xs transition-all duration-200 ${
            currentPage === 1
              ? "text-slate-800/35 dark:text-gray-200/30"
              : "text-slate-800 dark:text-gray-200 hover:border-gray-400/65 dark:hover:border-gray-500/50"
          }`}
          onClick={() => {
            if (currentPage !== 1) {
              setCurrentPage(1);
            }
          }}
        >
          <FaChevronLeft />
        </div>

        <div
          className={`w-8 h-8 rounded-md border-2 border-gray-300/50 dark:border-gray-600/40 flex items-center
          justify-center text-xs transition-all duration-200 ${
            currentPage === 2
              ? "text-slate-800/35 dark:text-gray-200/30"
              : "text-slate-800 dark:text-gray-200 hover:border-gray-400/65 dark:hover:border-gray-500/50"
          }`}
          onClick={() => {
            if (currentPage !== 2) {
              setCurrentPage(2);
            }
          }}
        >
          <FaChevronRight />
        </div>
      </div>
    </div>
  );
};

export default Details;
