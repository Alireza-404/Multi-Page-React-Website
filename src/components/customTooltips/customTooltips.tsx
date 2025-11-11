interface TooltipInterface {
  active?: boolean;
  payload?: any[];
  chart?: string;
}

export const LineChartCustomTooltip = ({
  active,
  payload,
  chart,
}: TooltipInterface) => {
  if (active && payload && payload?.length) {
    const { date, activity } = payload[0].payload;

    return (
      <div
        className="h-14 w-24 bg-gray-200 dark:bg-[#0b0e14] rounded-lg flex flex-col border-2 border-gray-300/50
      dark:border-gray-600/40"
      >
        <p className="text-slate-800 dark:text-gray-200 text-sm h-1/2 px-2.5 flex items-center font-medium">
          {date}
        </p>

        <div
          className="bg-gray-100 dark:bg-[#05070a] h-1/2 flex justify-between items-center p-2.5 border-t-2
        border-gray-300 dark:border-gray-600/40"
        >
          <span
            className={`w-5 h-1 ${
              chart === "firstChart"
                ? "bg-green-600"
                : chart === "secondChart"
                ? "bg-red-600"
                : "bg-gray-400"
            } rounded-full`}
          ></span>

          <span className="text-slate-800 dark:text-gray-200 text-sm font-medium">
            {activity}
          </span>
        </div>
      </div>
    );
  }
};

export const AreaChartCustomTooltip = ({
  active,
  payload,
}: TooltipInterface) => {
  if (active && payload && payload.length) {
    const { date, direct, referral, organic } = payload[0].payload;

    return (
      <div
        className="w-auto bg-gray-200 dark:bg-[#0b0e14] rounded-lg flex flex-col border-2 border-gray-300/50
      dark:border-gray-600/40 -translate-y-1/2 -translate-x-1/3 xs:translate-x-0 xs:translate-y-0"
      >
        <p className="py-1.5 px-3.5 text-slate-800 dark:text-gray-200 font-semibold text-sm">
          {date}
        </p>

        <div className="flex flex-col gap-y-0.5 bg-gray-100 dark:bg-[#05070a] py-1.5 px-3.5">
          <div className="flex items-center justify-between gap-x-5">
            <div className="flex items-center gap-x-2 flex-row-reverse">
              <span className="text-gray-500 dark:text-grat-400 font-medium text-sm">
                Direct
              </span>
              <span className="w-5 h-1 rounded-full block bg-[#005ab3]"></span>
            </div>

            <p className="text-slate-800 dark:text-gray-200 font-medium text-sm">
              {direct}
            </p>
          </div>

          <div className="flex items-center justify-between gap-x-5">
            <div className="flex items-center gap-x-2 flex-row-reverse">
              <span className="text-gray-500 dark:text-grat-400 font-medium text-sm">
                Referral
              </span>
              <span className="w-5 h-1 rounded-full block bg-[#027af2ff]"></span>
            </div>

            <p className="text-slate-800 dark:text-gray-200 font-medium text-sm">
              {referral}
            </p>
          </div>

          <div className="flex items-center justify-between gap-x-5">
            <div className="flex items-center gap-x-2 flex-row-reverse">
              <span className="text-gray-500 dark:text-grat-400 font-medium text-sm">
                Organic
              </span>
              <span className="w-5 h-1 rounded-full block bg-[#5199e3]"></span>
            </div>

            <p className="text-slate-800 dark:text-gray-200 font-medium text-sm">
              {organic}
            </p>
          </div>
        </div>
      </div>
    );
  }
};

export const BarChartCustomTooltip = ({
  active,
  payload,
}: TooltipInterface) => {
  if (active && payload && payload.length) {
    const { date, pageViews, downloads, conversions } = payload[0].payload;

    return (
      <div
        className="w-auto bg-gray-200 dark:bg-[#0b0e14] rounded-lg flex flex-col border-2 border-gray-300/50
      dark:border-gray-600/40"
      >
        <p className="py-1.5 px-3.5 text-slate-800 dark:text-gray-200 font-semibold text-sm">
          {date}
        </p>

        <div className="flex flex-col gap-y-1 bg-gray-100 dark:bg-[#05070a] py-1.5 px-3.5">
          <div className="flex items-center justify-between gap-x-8">
            <div className="flex items-center gap-x-3 flex-row-reverse">
              <span className="text-gray-500 dark:text-grat-400 font-medium text-sm">
                Page Views
              </span>
              <span className="w-3 h-3 rounded-sm block bg-[#4ca6ff]"></span>
            </div>

            <p className="text-slate-800 dark:text-gray-200 font-medium text-sm">
              {pageViews}
            </p>
          </div>

          <div className="flex items-center justify-between gap-x-8">
            <div className="flex items-center gap-x-3 flex-row-reverse">
              <span className="text-gray-500 dark:text-grat-400 font-medium text-sm">
                Downloads
              </span>
              <span className="w-3 h-3 rounded-sm block bg-[#027af2]"></span>
            </div>

            <p className="text-slate-800 dark:text-gray-200 font-medium text-sm">
              {downloads}
            </p>
          </div>

          <div className="flex items-center justify-between gap-x-8">
            <div className="flex items-center gap-x-3 flex-row-reverse">
              <span className="text-gray-500 dark:text-grat-400 font-medium text-sm">
                Conversions
              </span>
              <span className="w-3 h-3 rounded-sm block bg-[#0059b3]"></span>
            </div>

            <p className="text-slate-800 dark:text-gray-200 font-medium text-sm">
              {conversions}
            </p>
          </div>
        </div>
      </div>
    );
  }
};

export const DetailChartCustomTooltip = ({
  active,
  payload,
}: TooltipInterface) => {
  if (active && payload && payload.length) {
    const { date, conversion } = payload[0].payload;

    return (
      <div
        className="h-14 w-24 bg-gray-200 dark:bg-[#0b0e14] rounded-lg flex flex-col border-2 border-gray-300/50
      dark:border-gray-600/40 z-50 absolute -translate-y-1/2"
      >
        <p className="text-slate-800 dark:text-gray-200 text-sm h-1/2 px-2.5 flex items-center font-medium">
          {date}
        </p>

        <div
          className="bg-gray-100 dark:bg-[#05070a] h-1/2 flex justify-between items-center p-2.5 border-t-2
        border-gray-300 dark:border-gray-600/40"
        >
          <span className="w-3 h-3 rounded-sm block bg-[#026BD4]"></span>

          <span className="text-slate-800 dark:text-gray-200 text-sm font-medium">
            {conversion}
          </span>
        </div>
      </div>
    );
  }
};

export const CircleChartCustomTooltip = ({
  active,
  payload,
}: TooltipInterface) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0].payload;

    return (
      <div
        className="bg-gray-100 dark:bg-[#05070a] px-3.5 py-1.5 rounded-md border-2 border-gray-300/50
    dark:border-gray-600/40 flex items-center gap-x-10 relative z-50"
      >
        <div className="flex items-center gap-x-2.5">
          <span
            className={`h-3 w-3 ${
              name === "India"
                ? "bg-[#B0BFDB]"
                : name === "USA"
                ? "bg-[#677899]"
                : name === "Other"
                ? "bg-[#3D475B]"
                : "bg-[#47536B]"
            } rounded-full`}
          ></span>

          <h5 className="text-slate-800 dark:text-gray-200 font-medium text-sm">
            {name}
          </h5>
        </div>
        <span className="text-slate-800 dark:text-gray-200 font-medium text-sm">
          {value.toLocaleString()}
        </span>
      </div>
    );
  }
};
