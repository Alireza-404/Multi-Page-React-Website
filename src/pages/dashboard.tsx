import { useDispatch, useSelector } from "react-redux";
import {
  Area,
  AreaChart,
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  FirstAreaChartData,
  FirstBarChartData,
  FirstChartData,
  SecondChartData,
  ThirdChartData,
} from "../data/chartsData";
import { MdShowChart } from "react-icons/md";
import { FaChevronRight } from "react-icons/fa";
import { LuSparkles } from "react-icons/lu";
import { useEffect, useState } from "react";
import {
  AreaChartCustomTooltip,
  BarChartCustomTooltip,
  CircleChartCustomTooltip,
  LineChartCustomTooltip,
} from "../components/customTooltips/customTooltips";
import type { AppDispatch, RootState } from "../redux/store";
import { motion } from "framer-motion";
import { GetUser } from "../redux/slices/authSlice";
import DashboardNav from "../components/dashboardNav/dashboardNav";
import Details from "../components/details/details";
import ProductsTree from "../components/productsTree/productsTree";

interface ChartBarInterface {
  total: number;
  date: string;
  pageViews: number;
  downloads: number;
  conversions: number;
}

const Dashboard = () => {
  const { user, status, error } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const [uid, setUid] = useState<string | null | undefined>(null);
  const [isUserLogged, setIsUserLogged] = useState<boolean>(false);
  const [showLoader, setShowLoader] = useState<boolean>(false);

  const [theme, setTheme] = useState<"Dark" | "Light">("Light");
  const [finallyBarChartData, setFinallyBarChartData] = useState<
    ChartBarInterface[]
  >([]);
  const [stringActiveLink, setStringActiveLink] = useState<null | string>(
    "Home"
  );
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [areaChartHeight, setAreaChartHeight] = useState<number>(
    window.innerWidth >= 1024 ? 300 : 250
  );
  const [barSize, setBarSize] = useState<number>(
    window.innerWidth >= 1536 ? 55 : 25
  );

  useEffect(() => {
    const getLocal = localStorage.getItem("SiteMarkTheme") || "Light";

    if (getLocal === "Light" || getLocal === "Dark") {
      setTheme(getLocal);
    }
  }, [theme]);

  useEffect(() => {
    window.scrollTo(0, 0);

    const chartData = FirstBarChartData.map((item) => ({
      ...item,
      total: item.pageViews + item.downloads + item.conversions,
    }));
    setFinallyBarChartData(chartData);
  }, []);

  // Area Chart Height
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setAreaChartHeight(300);
      } else {
        setAreaChartHeight(250);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Composed Chart Height
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1536) {
        setBarSize(55);
      } else {
        setBarSize(25);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Get User
  useEffect(() => {
    const getUid = localStorage.getItem("uid");
    const getUidFromSession = sessionStorage.getItem("uid");

    const getIsUserLogged = localStorage.getItem(
      "LoginInMultiPageReactWebsite"
    );
    const getIsUserLoggedFromSession = sessionStorage.getItem(
      "SessionLoginInMultiPageReactWebsite"
    );

    if (getUid && getIsUserLogged && JSON.parse(getIsUserLogged)) {
      setUid(getUid);
      setIsUserLogged(JSON.parse(getIsUserLogged));
      dispatch(GetUser(getUid));
    } else if (
      getUidFromSession &&
      getIsUserLoggedFromSession &&
      JSON.parse(getIsUserLoggedFromSession)
    ) {
      setUid(getUidFromSession);
      setIsUserLogged(JSON.parse(getIsUserLoggedFromSession));
      dispatch(GetUser(getUidFromSession));
    } else {
      setUid(null);
      setIsUserLogged(false);
    }
  }, []);

  useEffect(() => {
    if (status === "loading") {
      setShowLoader(true);
    } else {
      const timer: NodeJS.Timeout = setTimeout(() => {
        setShowLoader(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  if (showLoader && uid && isUserLogged)
    return (
      <div className="bg-gray-200 dark:bg-[#0c1017] flex items-center justify-center fixed z-[9999] inset-0">
        <motion.p
          animate={{ backgroundPosition: ["0% 200%", "200% 0%"] }}
          transition={{ duration: 2, ease: "linear", repeat: Infinity }}
          className="md:text-7xl text-5xl text-transparent bg-clip-text bg-gradient-to-r from-[#0272f2] via-[#4beea7]
          to-[#0272f2] font-bold font-mono h-20 flex items-center select-none"
          style={{ backgroundSize: "200% 200%" }}
        >
          Loading
          {[0, 1, 2].map((i) => (
            <motion.span
              className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#27f2ff] via-[#4beea7] to-[#0272f2]"
              style={{
                WebkitBackgroundClip: "text",
                filter:
                  "drop-shadow(0 0 6px rgba(75,238,167,0.8)) drop-shadow(0 0 4px rgba(2,114,242,0.8))",
              }}
              key={i}
              animate={{
                y: [-25, 0, 0, 25],
                opacity: [0, 1, 1, 0],
                scale: [0.8, 1, 1, 0.8],
              }}
              transition={{
                ease: "easeInOut",
                duration: 0.4 * 4,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            >
              .
            </motion.span>
          ))}
        </motion.p>
      </div>
    );

  const calculateOffsets = (item: ChartBarInterface) => {
    const { pageViews, downloads, total } = item;
    const pagePercent = pageViews / total;
    const downloadPercent = downloads / total;

    return {
      page: { start: 0, end: pagePercent },
      download: { start: pagePercent, end: pagePercent + downloadPercent },
      conversion: { start: pagePercent + downloadPercent, end: 1 },
    };
  };

  const circleChartData = [
    { name: "Other", value: 5000, color: "#3D475B" },
    { name: "Brazil", value: 10000, color: "#47536B" },
    { name: "USA", value: 35000, color: "#677899" },
    { name: "India", value: 50000, color: "#B0BFDB" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#05070a] overflow-x-hidden md2:grid md2:grid-cols-[240px_1fr]">
      <DashboardNav
        setStringActiveLink={setStringActiveLink}
        firstname={user?.firstname as string}
        lastname={user?.lastname as string}
        email={user?.email as string}
      />

      <div className="min-w-full">
        <main className="pt-20 md2:pt-7">
          <div
            className="hidden md2:flex mb-5 w-11/12 xl:w-full
            xl:px-10 mx-auto"
          >
            <div className="flex items-center gap-x-2.5">
              <span className="font-medium text-gray-500 dark:text-gray-400 cursor-pointer">
                Dashboard
              </span>

              <FaChevronRight className="text-gray-500 dark:text-gray-400 text-sm" />

              <span className="font-medium text-slate-800 dark:text-gray-200 cursor-pointer">
                {stringActiveLink}
              </span>
            </div>
          </div>

          <p
            className="text-[22px] font-semibold text-slate-800 dark:text-gray-200 mb-5 w-11/12 xl:w-full
         xl:px-10 mx-auto"
          >
            Overview
          </p>

          <section
            className="w-11/12 xl:w-full mx-auto xl:px-10 flex flex-col gap-y-5
           xs:grid xs:grid-cols-2 xs:gap-5 xl:grid-cols-4"
          >
            {/* Chart 1 */}
            <div
              className="overflow-hidden rounded-md border-2 border-gray-300/50 dark:border-gray-600/40 py-3 px-5
            flex flex-col gap-y-1.5 justify-center"
            >
              <p className="text-slate-800 dark:text-gray-200 font-medium dark:font-normal">
                Users
              </p>

              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold text-slate-800 dark:text-gray-200">
                  14k
                </p>

                <span
                  className="px-2 py-0.5 rounded-full bg-green-50 text-green-600 text-xs font-bold
                border border-green-600/30 dark:bg-green-600/10 dark:text-green-400"
                >
                  +25%
                </span>
              </div>

              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium dark:font-normal">
                Last 30 days
              </p>

              <ResponsiveContainer
                width={"100%"}
                height={50}
                className="[&_*]:outline-none [&_*]:focus:outline-none"
              >
                <LineChart
                  data={FirstChartData}
                  className="border-none outline-none"
                >
                  <defs>
                    <filter id="shadow-1" height="130%">
                      <feDropShadow
                        dx="0"
                        dy="10"
                        stdDeviation="6"
                        floodColor="#16a34a"
                        floodOpacity="0.5"
                      />
                    </filter>
                  </defs>

                  <Tooltip
                    content={<LineChartCustomTooltip chart={"firstChart"} />}
                    cursor={false}
                  />

                  <Line
                    type={"linear"}
                    dataKey={"activity"}
                    stroke="#16a34a"
                    animationEasing="linear"
                    strokeWidth={2}
                    dot={{ display: "none" }}
                    activeDot={{ r: 5, fill: "#16a34a", stroke: "none" }}
                    filter="url(#shadow-1)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Chart 2 */}
            <div
              className="overflow-hidden rounded-md border-2 border-gray-300/50 dark:border-gray-600/40 py-3 px-5
            flex flex-col gap-y-1.5 justify-center"
            >
              <p className="text-slate-800 dark:text-gray-200 font-medium dark:font-normal">
                Conversions
              </p>

              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold text-slate-800 dark:text-gray-200">
                  325
                </p>

                <span
                  className="px-2 py-0.5 rounded-full bg-red-50 text-red-600 text-xs font-bold
              border border-red-600/30 dark:bg-red-600/10 dark:text-red-400"
                >
                  -25%
                </span>
              </div>

              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium dark:font-normal">
                Last 31 days
              </p>

              <ResponsiveContainer
                width={"100%"}
                height={50}
                className="[&_*]:outline-none [&_*]:focus:outline-none"
              >
                <LineChart
                  data={SecondChartData}
                  className="border-none outline-none"
                >
                  <defs>
                    <filter id="shadow-2" height="130%">
                      <feDropShadow
                        dx="0"
                        dy="10"
                        stdDeviation="6"
                        floodColor="#dc2626"
                        floodOpacity="0.5"
                      />
                    </filter>
                  </defs>

                  <Tooltip
                    content={<LineChartCustomTooltip chart={"secondChart"} />}
                    cursor={false}
                  />

                  <Line
                    type={"linear"}
                    dataKey={"activity"}
                    stroke="#dc2626"
                    animationEasing="linear"
                    strokeWidth={2}
                    dot={{ display: "none" }}
                    activeDot={{ r: 5, fill: "#dc2626", stroke: "none" }}
                    filter="url(#shadow-2)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Chart 3 */}
            <div>
              <div
                className="overflow-hidden rounded-md border-2 border-gray-300/50 dark:border-gray-600/40 py-3 px-5
            flex flex-col gap-y-1.5 justify-center"
              >
                <p className="text-slate-800 dark:text-gray-200 font-medium dark:font-normal">
                  Event count
                </p>

                <div className="flex items-center justify-between">
                  <p className="text-2xl font-bold text-slate-800 dark:text-gray-200">
                    200k
                  </p>

                  <span
                    className="px-2 py-0.5 rounded-full bg-gray-50 text-gray-500 text-xs font-bold
                  border border-gray-600/30 dark:bg-gray-400/10 dark:text-gray-300"
                  >
                    +5%
                  </span>
                </div>

                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium dark:font-normal">
                  Last 30 days
                </p>

                <ResponsiveContainer
                  width={"100%"}
                  height={50}
                  className="[&_*]:outline-none [&_*]:focus:outline-none"
                >
                  <LineChart
                    data={ThirdChartData}
                    className="border-none outline-none"
                  >
                    <defs>
                      <filter id="shadow-3" height="130%">
                        <feDropShadow
                          dx="0"
                          dy="10"
                          stdDeviation="6"
                          floodColor="#9ca3af"
                          floodOpacity="0.5"
                        />
                      </filter>
                    </defs>

                    <Tooltip
                      content={<LineChartCustomTooltip chart={"thirdChart"} />}
                      cursor={false}
                    />

                    <Line
                      type={"linear"}
                      dataKey={"activity"}
                      stroke="#9ca3af"
                      animationEasing="linear"
                      strokeWidth={2}
                      dot={{ display: "none" }}
                      activeDot={{ r: 5, fill: "#9ca3af", stroke: "none" }}
                      filter="url(#shadow-3)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div
              className="w-full h-[172px] overflow-hidden rounded-md border-2 border-gray-300/50 dark:border-gray-600/40
            p-4  flex flex-col justify-center gap-y-1.5 bg-gray-200 dark:bg-[#0b0e14]"
            >
              <div className="relative">
                <MdShowChart className="text-slate-800 dark:text-gray-200 text-3xl" />
                <LuSparkles className="text-[13px] absolute top-0 left-0 text-yellow-400 dark:text-yellow-300" />
              </div>

              <p className="font-medium text-slate-800 dark:text-gray-200">
                Explore your data
              </p>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Uncover performance and visitor insights with our data wizardry.
              </p>

              <button
                type="button"
                className="group flex items-center justify-center gap-x-1.5 text-gray-100 bg-slate-800 
              hover:bg-slate-700 rounded-md font-semibold transition duration-200 dark:text-[#05070a] dark:bg-gray-200
               dark:hover:bg-white/75 text-sm py-1.5"
              >
                Get insights{" "}
                <span>
                  <FaChevronRight
                    className="text-xs lg:rotate-180 lg:group-hover:rotate-0 transition-all duration-200
                  lg:group-hover:text-sm group-hover:translate-x-0.5"
                  />
                </span>
              </button>
            </div>
          </section>

          <section
            className="w-11/12 xl:w-full mx-auto xl:px-10 flex flex-col gap-y-5 pt-5
            lg:flex-row lg:gap-x-5"
          >
            <div
              className="border-2 border-gray-300/50 dark:border-gray-600/40 rounded-md p-4 flex flex-col gap-y-1.5\
            lg:w-1/2 lg:h-[430px]"
            >
              <p className="font-medium text-slate-800 dark:text-gray-200">
                Sessions
              </p>

              <div className="flex items-center gap-x-2.5">
                <span className="text-2xl font-bold text-slate-800 dark:text-gray-200">
                  13,277
                </span>
                <span
                  className="px-2.5 py-0.5 rounded-full bg-green-50 text-green-600 text-xs font-bold
                border border-green-600/30 dark:bg-green-600/10 dark:text-green-400"
                >
                  +35%
                </span>
              </div>

              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Sessions per day for the last 30 days
              </p>

              <ResponsiveContainer
                width={"100%"}
                height={areaChartHeight}
                className="[&_*]:outline-none [&_*]:focus:outline-none select-none mt-2.5"
              >
                <AreaChart data={FirstAreaChartData}>
                  <defs>
                    <linearGradient id="direct" x1={0} y1={0} x2={0} y2={1}>
                      <stop
                        offset={theme === "Dark" ? "5%" : "15%"}
                        stopColor="#0059b3ff"
                        stopOpacity={theme === "Dark" ? 0.5 : 0.4}
                      ></stop>
                      <stop
                        offset={theme === "Dark" ? "95%" : "85%"}
                        stopColor="#0059b3ff"
                        stopOpacity={0.1}
                      ></stop>
                    </linearGradient>

                    <linearGradient id="referral" x1={0} y1={0} x2={0} y2={1}>
                      <stop
                        offset={theme === "Dark" ? "5%" : "15%"}
                        stopColor="#027af2ff"
                        stopOpacity={theme === "Dark" ? 0.5 : 0.4}
                      ></stop>
                      <stop
                        offset={theme === "Dark" ? "95%" : "85%"}
                        stopColor="#027af2ff"
                        stopOpacity={0.1}
                      ></stop>
                    </linearGradient>

                    <linearGradient id="organic" x1={0} y1={0} x2={0} y2={1}>
                      <stop
                        offset={theme === "Dark" ? "5%" : "15%"}
                        stopColor="#99ccffff"
                        stopOpacity={theme === "Dark" ? 0.5 : 0.4}
                      ></stop>
                      <stop
                        offset={theme === "Dark" ? "95%" : "85%"}
                        stopColor="#99ccffff"
                        stopOpacity={0.1}
                      ></stop>
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    strokeDasharray={"5 5"}
                    vertical={false}
                    strokeOpacity={0.3}
                    stroke={"#8c8f95bd"}
                  />

                  <XAxis
                    dataKey={"date"}
                    tick={({ x, y, payload }) => (
                      <text
                        x={x + 0}
                        y={y + 15}
                        textAnchor="middle"
                        fill={theme === "Dark" ? "#e5e7eb" : "#1e293b"}
                        className="text-sm"
                      >
                        {payload.value}
                      </text>
                    )}
                  />
                  <YAxis
                    tick={({ x, y, payload }) => (
                      <text
                        x={x - 10}
                        y={y + 5}
                        textAnchor="end"
                        fill={theme === "Dark" ? "#e5e7eb" : "#1e293b"}
                        className="font-medium text-sm"
                      >
                        {payload.value.toLocaleString()}
                      </text>
                    )}
                  />

                  <Tooltip
                    content={<AreaChartCustomTooltip />}
                    formatter={(value: number) => value.toLocaleString()}
                    cursor={{
                      strokeDasharray: "5 5",
                      stroke: `${theme === "Dark" ? "#e5e7eb" : "#1e293b"}`,
                    }}
                  />

                  <Area
                    type={"linear"}
                    dataKey={"direct"}
                    stroke={theme === "Dark" ? "#fff" : "#5b9ee1"}
                    strokeWidth={theme === "Dark" ? 0.3 : 2.5}
                    fillOpacity={1}
                    fill="url(#direct)"
                    activeDot={{ fill: "#0059b3ff", stroke: "none", r: 5.5 }}
                    isAnimationActive={false}
                  />

                  <Area
                    type={"linear"}
                    dataKey={"referral"}
                    stroke={theme === "Dark" ? "#fff" : "#027af2ff"}
                    strokeWidth={theme === "Dark" ? 0.3 : 2.5}
                    fillOpacity={1}
                    fill="url(#referral)"
                    activeDot={{ fill: "#027af2ff", stroke: "none", r: 5.5 }}
                    isAnimationActive={false}
                  />

                  <Area
                    type={"linear"}
                    dataKey={"organic"}
                    stroke={theme === "Dark" ? "#fff" : "#5199e3"}
                    strokeWidth={theme === "Dark" ? 0.3 : 2.5}
                    fillOpacity={1}
                    fill="url(#organic)"
                    activeDot={{ fill: "#5199e3", stroke: "none", r: 5.5 }}
                    isAnimationActive={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div
              className="border-2 border-gray-300/50 dark:border-gray-600/40 rounded-md p-4 flex flex-col gap-y-1.5\
            lg:w-1/2 lg:h-[430px]"
            >
              <p className="font-medium text-slate-800 dark:text-gray-200">
                Page views and downloads
              </p>

              <div className="flex items-center gap-x-2.5">
                <span className="text-2xl font-bold text-slate-800 dark:text-gray-200">
                  1.3M
                </span>
                <span
                  className="px-2.5 py-0.5 rounded-full bg-red-50 text-red-600 text-xs font-bold
                border border-red-600/30 dark:bg-red-600/10 dark:text-red-400"
                >
                  -8%
                </span>
              </div>

              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Page views and downloads for the last 6 months
              </p>

              <ResponsiveContainer
                width="100%"
                height={300}
                className={
                  "mt-2.5 [&_*]:outline-none [&_*]:focus:outline-none select-none"
                }
              >
                <ComposedChart data={finallyBarChartData}>
                  <defs>
                    {finallyBarChartData.map((item) => {
                      const offsets = calculateOffsets(item);
                      return (
                        <linearGradient
                          key={item.date}
                          id={`grad-${item.date}`}
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset={offsets.page.start}
                            stopColor="#4ca6ff"
                            stopOpacity={1}
                          />
                          <stop
                            offset={offsets.page.end}
                            stopColor="#4ca6ff"
                            stopOpacity={1}
                          />

                          <stop
                            offset={offsets.download.start}
                            stopColor="#027af2"
                            stopOpacity={1}
                          />
                          <stop
                            offset={offsets.download.end}
                            stopColor="#027af2"
                            stopOpacity={1}
                          />

                          <stop
                            offset={offsets.conversion.start}
                            stopColor="#0059b3"
                            stopOpacity={1}
                          />
                          <stop
                            offset={offsets.conversion.end}
                            stopColor="#0059b3"
                            stopOpacity={1}
                          />
                        </linearGradient>
                      );
                    })}
                  </defs>

                  <CartesianGrid
                    strokeDasharray="5 5"
                    vertical={false}
                    strokeOpacity={0.3}
                    stroke={"#8c8f95bd"}
                  />

                  <XAxis
                    dataKey="date"
                    tick={({ x, y, payload }) => (
                      <text
                        x={x + 0}
                        y={y + 15}
                        textAnchor="middle"
                        fill={theme === "Dark" ? "#e5e7eb" : "#1e293b"}
                        className="text-sm"
                      >
                        {payload.value}
                      </text>
                    )}
                  />

                  <YAxis
                    tick={({ x, y, payload }) => (
                      <text
                        x={x - 10}
                        y={y + 5}
                        textAnchor="end"
                        fill={theme === "Dark" ? "#e5e7eb" : "#1e293b"}
                        className="font-medium text-sm"
                      >
                        {payload.value.toLocaleString()}
                      </text>
                    )}
                  />

                  <Tooltip
                    cursor={{
                      strokeWidth: `${barSize === 55 ? "65" : "35"}`,
                      stroke: "#8c8f95bd",
                      strokeOpacity: 0.3,
                    }}
                    content={<BarChartCustomTooltip />}
                  />

                  <Bar
                    dataKey="total"
                    barSize={barSize}
                    radius={[12, 12, 0, 0]}
                    isAnimationActive={false}
                  >
                    {finallyBarChartData.map((item) => {
                      return (
                        <Cell
                          key={item.date}
                          fill={`url(#grad-${item.date})`}
                        />
                      );
                    })}
                  </Bar>
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </section>

          <div className="py-14 xl:py-12">
            <span className="bg-gray-300/50 dark:bg-gray-600/40 block w-full h-0.5 dark:h-px"></span>
          </div>

          <section
            className="w-11/12 xl:w-full mx-auto xl:px-10 flex flex-col gap-y-5
            "
          >
            <p className="text-[22px] font-semibold text-slate-800 dark:text-gray-200">
              Details
            </p>

            <div className="flex flex-col gap-y-5 xl:flex-row xl:gap-x-5 w-full">
              <div className="flex flex-col gap-y-5 xl:w-2/3">
                <Details />
              </div>

              <div className="flex flex-col gap-y-5 xs:flex-row xs:gap-x-5 xl:flex-col xl:flex-shrink-0 xl:flex-grow">
                <ProductsTree />

                <div
                  className="border-2 border-gray-300/50 dark:border-gray-600/40 rounded-md p-4 
              flex flex-col gap-y-2.5 xs:w-[60%] xl:w-full"
                >
                  <p className="text-slate-800 dark:text-gray-200 font-semibold text-[15px]">
                    Users by country
                  </p>

                  <div className="w-full flex items-center justify-center relative">
                    <ResponsiveContainer
                      width={"100%"}
                      height={220}
                      className="[&_*]:outline-none [&_*]:focus:outline-none"
                    >
                      <PieChart>
                        <Pie
                          data={circleChartData}
                          innerRadius={75}
                          outerRadius={100}
                          paddingAngle={2}
                          dataKey="value"
                          onMouseEnter={(_, index) => setActiveIndex(index)}
                          onMouseLeave={() => setActiveIndex(null)}
                        >
                          <Tooltip
                            content={<CircleChartCustomTooltip />}
                            wrapperStyle={{
                              zIndex: 8888,
                              outline: "none",
                              border: "none",
                            }}
                          />

                          {circleChartData.map((entry, index) => {
                            const isActive = index === activeIndex;
                            const faded = activeIndex !== null && !isActive;

                            return (
                              <Cell
                                key={index}
                                fill={entry.color}
                                strokeWidth={0}
                                className={`${
                                  isActive && "circle-chart-animation"
                                }`}
                                style={{
                                  transform: isActive
                                    ? "scale(1.08)"
                                    : "scale(1)",
                                  opacity: faded ? 0.3 : 1,
                                  cursor: "pointer",
                                }}
                              />
                            );
                          })}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>

                    <div className="absolute z-10 flex flex-col items-center justify-center pointer-events-none">
                      <p className="text-gray-500 dark:text-gray-300 text-2xl font-semibold">
                        98.5K
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        Total
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-y-5">
                    <div className="flex items-center gap-x-2.5">
                      <svg
                        className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-8mcbwj"
                        focusable="false"
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                      >
                        <g clipPath="url(#a)">
                          <mask
                            id="b"
                            maskUnits="userSpaceOnUse"
                            x="-4"
                            y="0"
                            width="32"
                            height="24"
                          >
                            <path d="M-4 0h32v24H-4V0Z" fill="#fff"></path>
                          </mask>
                          <g mask="url(#b)">
                            <path
                              fillRule="evenodd"
                              clipPath="evenodd"
                              d="M-4 0v24h32V0H-4Z"
                              fill="#F7FCFF"
                            ></path>
                            <mask
                              id="c"
                              maskUnits="userSpaceOnUse"
                              x="-4"
                              y="0"
                              width="32"
                              height="24"
                            >
                              <path
                                fillRule="evenodd"
                                clipPath="evenodd"
                                d="M-4 0v24h32V0H-4Z"
                                fill="#fff"
                              ></path>
                            </mask>
                            <g
                              mask="url(#c)"
                              fillRule="evenodd"
                              clipPath="evenodd"
                            >
                              <path d="M-4 0v8h32V0H-4Z" fill="#FF8C1A"></path>
                              <path
                                d="M-4 16v8h32v-8H-4Z"
                                fill="#5EAA22"
                              ></path>
                              <path
                                d="M8 12a4 4 0 1 0 8 0 4 4 0 0 0-8 0Zm7 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                fill="#3D58DB"
                              ></path>
                              <path
                                d="m12 12.9-.6 3 .4-3-1.5 2.8 1.2-3L9.4 15l2-2.4-2.8 1.6 2.6-1.8-3 .7 3-1H8l3.2-.2-3-1 3 .8-2.6-1.9 2.8 1.7-2-2.5 2.1 2.3-1.2-3 1.5 2.9-.4-3.2.6 3.2.6-3.2-.4 3.2 1.5-2.8-1.2 2.9L14.6 9l-2 2.5 2.8-1.7-2.6 1.9 3-.8-3 1 3.2.1-3.2.1 3 1-3-.7 2.6 1.8-2.8-1.6 2 2.4-2.1-2.3 1.2 3-1.5-2.9.4 3.2-.6-3.1Z"
                                fill="#3D58DB"
                              ></path>
                            </g>
                          </g>
                        </g>
                        <defs>
                          <clipPath id="a">
                            <rect
                              width="24"
                              height="24"
                              rx="12"
                              fill="#fff"
                            ></rect>
                          </clipPath>
                        </defs>
                      </svg>

                      <div className="flex flex-col gap-y-1.5 w-full">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-800 dark:text-gray-200 font-medium text-sm">
                            India
                          </span>
                          <span className="text-gray-500 dark:text-gray-400 font-medium text-sm">
                            50%
                          </span>
                        </div>

                        <div className="bg-gray-200 dark:bg-[#0b0e14] h-2 rounded-md overflow-hidden w-full">
                          <div className="bg-[#B0BFDB] h-full w-1/2"></div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-x-2.5">
                      <svg
                        className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-8mcbwj"
                        focusable="false"
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_983_1725)">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M-4 0H28V24H-4V0Z"
                            fill="#F7FCFF"
                          ></path>
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M-4 14.6667V16.6667H28V14.6667H-4Z"
                            fill="#E31D1C"
                          ></path>
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M-4 18.3333V20.3333H28V18.3333H-4Z"
                            fill="#E31D1C"
                          ></path>
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M-4 7.33325V9.33325H28V7.33325H-4Z"
                            fill="#E31D1C"
                          ></path>
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M-4 22V24H28V22H-4Z"
                            fill="#E31D1C"
                          ></path>
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M-4 11V13H28V11H-4Z"
                            fill="#E31D1C"
                          ></path>
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M-4 0V2H28V0H-4Z"
                            fill="#E31D1C"
                          ></path>
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M-4 3.66675V5.66675H28V3.66675H-4Z"
                            fill="#E31D1C"
                          ></path>
                          <path d="M-4 0H16V13H-4V0Z" fill="#2E42A5"></path>
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M-2.27876 2.93871L-3.00465 3.44759L-2.75958 2.54198L-3.4043 1.96807H-2.56221L-2.27978 1.229L-1.94861 1.96807H-1.23075L-1.79479 2.54198L-1.57643 3.44759L-2.27876 2.93871ZM1.72124 2.93871L0.995357 3.44759L1.24042 2.54198L0.595707 1.96807H1.43779L1.72022 1.229L2.05139 1.96807H2.76925L2.20521 2.54198L2.42357 3.44759L1.72124 2.93871ZM4.99536 3.44759L5.72124 2.93871L6.42357 3.44759L6.20517 2.54198L6.76927 1.96807H6.05137L5.72022 1.229L5.43779 1.96807H4.59571L5.24042 2.54198L4.99536 3.44759ZM9.72127 2.93871L8.99537 3.44759L9.24047 2.54198L8.59567 1.96807H9.43777L9.72027 1.229L10.0514 1.96807H10.7693L10.2052 2.54198L10.4236 3.44759L9.72127 2.93871ZM-3.00465 7.44759L-2.27876 6.93871L-1.57643 7.44759L-1.79479 6.54198L-1.23075 5.96807H-1.94861L-2.27978 5.229L-2.56221 5.96807H-3.4043L-2.75958 6.54198L-3.00465 7.44759ZM1.72124 6.93871L0.995357 7.44759L1.24042 6.54198L0.595707 5.96807H1.43779L1.72022 5.229L2.05139 5.96807H2.76925L2.20521 6.54198L2.42357 7.44759L1.72124 6.93871ZM4.99536 7.44759L5.72124 6.93871L6.42357 7.44759L6.20517 6.54198L6.76927 5.96807H6.05137L5.72022 5.229L5.43779 5.96807H4.59571L5.24042 6.54198L4.99536 7.44759ZM9.72127 6.93871L8.99537 7.44759L9.24047 6.54198L8.59567 5.96807H9.43777L9.72027 5.229L10.0514 5.96807H10.7693L10.2052 6.54198L10.4236 7.44759L9.72127 6.93871ZM-3.00465 11.4476L-2.27876 10.9387L-1.57643 11.4476L-1.79479 10.542L-1.23075 9.96807H-1.94861L-2.27978 9.229L-2.56221 9.96807H-3.4043L-2.75958 10.542L-3.00465 11.4476ZM1.72124 10.9387L0.995357 11.4476L1.24042 10.542L0.595707 9.96807H1.43779L1.72022 9.229L2.05139 9.96807H2.76925L2.20521 10.542L2.42357 11.4476L1.72124 10.9387ZM4.99536 11.4476L5.72124 10.9387L6.42357 11.4476L6.20517 10.542L6.76927 9.96807H6.05137L5.72022 9.229L5.43779 9.96807H4.59571L5.24042 10.542L4.99536 11.4476ZM9.72127 10.9387L8.99537 11.4476L9.24047 10.542L8.59567 9.96807H9.43777L9.72027 9.229L10.0514 9.96807H10.7693L10.2052 10.542L10.4236 11.4476L9.72127 10.9387ZM12.9954 3.44759L13.7213 2.93871L14.4236 3.44759L14.2052 2.54198L14.7693 1.96807H14.0514L13.7203 1.229L13.4378 1.96807H12.5957L13.2405 2.54198L12.9954 3.44759ZM13.7213 6.93871L12.9954 7.44759L13.2405 6.54198L12.5957 5.96807H13.4378L13.7203 5.229L14.0514 5.96807H14.7693L14.2052 6.54198L14.4236 7.44759L13.7213 6.93871ZM12.9954 11.4476L13.7213 10.9387L14.4236 11.4476L14.2052 10.542L14.7693 9.96807H14.0514L13.7203 9.229L13.4378 9.96807H12.5957L13.2405 10.542L12.9954 11.4476ZM-0.278763 4.93871L-1.00464 5.44759L-0.759583 4.54198L-1.40429 3.96807H-0.562213L-0.279783 3.229L0.0513873 3.96807H0.769247L0.205207 4.54198L0.423567 5.44759L-0.278763 4.93871ZM2.99536 5.44759L3.72124 4.93871L4.42357 5.44759L4.20521 4.54198L4.76925 3.96807H4.05139L3.72022 3.229L3.43779 3.96807H2.59571L3.24042 4.54198L2.99536 5.44759ZM7.72127 4.93871L6.99537 5.44759L7.24047 4.54198L6.59567 3.96807H7.43777L7.72027 3.229L8.05137 3.96807H8.76927L8.20517 4.54198L8.42357 5.44759L7.72127 4.93871ZM-1.00464 9.44759L-0.278763 8.93871L0.423567 9.44759L0.205207 8.54198L0.769247 7.96807H0.0513873L-0.279783 7.229L-0.562213 7.96807H-1.40429L-0.759583 8.54198L-1.00464 9.44759ZM3.72124 8.93871L2.99536 9.44759L3.24042 8.54198L2.59571 7.96807H3.43779L3.72022 7.229L4.05139 7.96807H4.76925L4.20521 8.54198L4.42357 9.44759L3.72124 8.93871ZM6.99537 9.44759L7.72127 8.93871L8.42357 9.44759L8.20517 8.54198L8.76927 7.96807H8.05137L7.72027 7.229L7.43777 7.96807H6.59567L7.24047 8.54198L6.99537 9.44759ZM11.7213 4.93871L10.9954 5.44759L11.2405 4.54198L10.5957 3.96807H11.4378L11.7203 3.229L12.0514 3.96807H12.7693L12.2052 4.54198L12.4236 5.44759L11.7213 4.93871ZM10.9954 9.44759L11.7213 8.93871L12.4236 9.44759L12.2052 8.54198L12.7693 7.96807H12.0514L11.7203 7.229L11.4378 7.96807H10.5957L11.2405 8.54198L10.9954 9.44759Z"
                            fill="#F7FCFF"
                          ></path>
                        </g>
                        <defs>
                          <clipPath id="clip0_983_1725">
                            <rect
                              width="24"
                              height="24"
                              rx="12"
                              fill="white"
                            ></rect>
                          </clipPath>
                        </defs>
                      </svg>

                      <div className="flex flex-col gap-y-1.5 w-full">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-800 dark:text-gray-200 font-medium text-sm">
                            USA
                          </span>
                          <span className="text-gray-500 dark:text-gray-400 font-medium text-sm">
                            35%
                          </span>
                        </div>

                        <div className="bg-gray-200 dark:bg-[#0b0e14] h-2 rounded-md overflow-hidden w-full">
                          <div className="bg-[#677899] h-full w-[35%]"></div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-x-2.5">
                      <svg
                        className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-8mcbwj"
                        focusable="false"
                        aria-hidden="true"
                        viewBox="0 0 24 25"
                        width="24"
                        height="25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_983_1741)">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M-4 0.5V24.5H28V0.5H-4Z"
                            fill="#009933"
                          ></path>
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M11.9265 4.20404L24.1283 12.7075L11.7605 20.6713L-0.191406 12.5427L11.9265 4.20404Z"
                            fill="#FFD221"
                          ></path>
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M11.9265 4.20404L24.1283 12.7075L11.7605 20.6713L-0.191406 12.5427L11.9265 4.20404Z"
                            fill="url(#paint0_linear_983_1741)"
                          ></path>
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12 17.7C14.7614 17.7 17 15.4614 17 12.7C17 9.93853 14.7614 7.69995 12 7.69995C9.2386 7.69995 7 9.93853 7 12.7C7 15.4614 9.2386 17.7 12 17.7Z"
                            fill="#2E42A5"
                          ></path>
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M10.379 15.07L10.1556 15.1874L10.1983 14.9387L10.0176 14.7626L10.2673 14.7263L10.379 14.5L10.4907 14.7263L10.7404 14.7626L10.5597 14.9387L10.6024 15.1874L10.379 15.07Z"
                            fill="#F7FCFF"
                          ></path>
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12.379 15.07L12.1556 15.1874L12.1983 14.9387L12.0176 14.7626L12.2673 14.7263L12.379 14.5L12.4907 14.7263L12.7404 14.7626L12.5597 14.9387L12.6024 15.1874L12.379 15.07Z"
                            fill="#F7FCFF"
                          ></path>
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12.379 16.27L12.1556 16.3874L12.1983 16.1387L12.0176 15.9625L12.2673 15.9262L12.379 15.7L12.4907 15.9262L12.7404 15.9625L12.5597 16.1387L12.6024 16.3874L12.379 16.27Z"
                            fill="#F7FCFF"
                          ></path>
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M11.379 12.07L11.1556 12.1874L11.1983 11.9387L11.0176 11.7626L11.2673 11.7263L11.379 11.5L11.4907 11.7263L11.7404 11.7626L11.5597 11.9387L11.6024 12.1874L11.379 12.07Z"
                            fill="#F7FCFF"
                          ></path>
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M11.379 14.07L11.1556 14.1874L11.1983 13.9387L11.0176 13.7626L11.2673 13.7263L11.379 13.5L11.4907 13.7263L11.7404 13.7626L11.5597 13.9387L11.6024 14.1874L11.379 14.07Z"
                            fill="#F7FCFF"
                          ></path>
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M9.97859 13.07L9.75519 13.1874L9.79789 12.9387L9.61719 12.7626L9.86689 12.7263L9.97859 12.5L10.0903 12.7263L10.34 12.7626L10.1593 12.9387L10.2019 13.1874L9.97859 13.07Z"
                            fill="#F7FCFF"
                          ></path>
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M8.5783 13.87L8.3549 13.9875L8.3976 13.7388L8.2168 13.5626L8.4666 13.5263L8.5783 13.3L8.6899 13.5263L8.9397 13.5626L8.759 13.7388L8.8016 13.9875L8.5783 13.87Z"
                            fill="#F7FCFF"
                          ></path>
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M13.1798 10.47L12.9565 10.5875L12.9991 10.3387L12.8184 10.1626L13.0682 10.1263L13.1798 9.90002L13.2915 10.1263L13.5413 10.1626L13.3605 10.3387L13.4032 10.5875L13.1798 10.47Z"
                            fill="#F7FCFF"
                          ></path>
                          <path
                            d="M7 12L7.5 10C11.6854 10.2946 14.6201 11.2147 17 13.5L16.5 15C14.4373 13.0193 10.7839 12.2664 7 12Z"
                            fill="#F7FCFF"
                          ></path>
                        </g>
                        <defs>
                          <linearGradient
                            id="paint0_linear_983_1741"
                            x1="27.9997"
                            y1="24.5"
                            x2="27.9997"
                            y2="0.5"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#FFC600"></stop>
                            <stop offset="1" stopColor="#FFDE42"></stop>
                          </linearGradient>
                          <clipPath id="clip0_983_1741">
                            <rect
                              y="0.5"
                              width="24"
                              height="24"
                              rx="12"
                              fill="white"
                            ></rect>
                          </clipPath>
                        </defs>
                      </svg>

                      <div className="flex flex-col gap-y-1.5 w-full">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-800 dark:text-gray-200 font-medium text-sm">
                            Brazil
                          </span>
                          <span className="text-gray-500 dark:text-gray-400 font-medium text-sm">
                            10%
                          </span>
                        </div>

                        <div className="bg-gray-200 dark:bg-[#0b0e14] h-2 rounded-md overflow-hidden w-full">
                          <div className="bg-[#47536B] h-full w-[10%]"></div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-x-2.5">
                      <svg
                        className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-8mcbwj"
                        focusable="false"
                        aria-hidden="true"
                        viewBox="0 0 24 25"
                        width="24"
                        height="25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_986_1789)">
                          <circle
                            cx="12"
                            cy="12.5"
                            r="12"
                            fill="#007FFF"
                          ></circle>
                          <path
                            d="M12 0.5C5.376 0.5 0 5.876 0 12.5C0 19.124 5.376 24.5 12 24.5C18.624 24.5 24 19.124 24 12.5C24 5.876 18.624 0.5 12 0.5ZM10.8 22.016C6.06 21.428 2.4 17.396 2.4 12.5C2.4 11.756 2.496 11.048 2.652 10.352L8.4 16.1V17.3C8.4 18.62 9.48 19.7 10.8 19.7V22.016ZM19.08 18.968C18.768 17.996 17.88 17.3 16.8 17.3H15.6V13.7C15.6 13.04 15.06 12.5 14.4 12.5H7.2V10.1H9.6C10.26 10.1 10.8 9.56 10.8 8.9V6.5H13.2C14.52 6.5 15.6 5.42 15.6 4.1V3.608C19.116 5.036 21.6 8.48 21.6 12.5C21.6 14.996 20.64 17.264 19.08 18.968Z"
                            fill="#3EE07F"
                          ></path>
                        </g>
                        <defs>
                          <clipPath id="clip0_986_1789">
                            <rect
                              width="24"
                              height="24"
                              fill="white"
                              transform="translate(0 0.5)"
                            ></rect>
                          </clipPath>
                        </defs>
                      </svg>

                      <div className="flex flex-col gap-y-1.5 w-full">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-800 dark:text-gray-200 font-medium text-sm">
                            Other
                          </span>
                          <span className="text-gray-500 dark:text-gray-400 font-medium text-sm">
                            5%
                          </span>
                        </div>

                        <div className="bg-gray-200 dark:bg-[#0b0e14] h-2 rounded-md overflow-hidden w-full">
                          <div className="bg-[#3D475B] h-full w-[5%]"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="py-16 flex items-center justify-center">
          <p className="font-medium text-gray-500 dark:text-gray-400">
            Copyright © Sitemark 2025.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
