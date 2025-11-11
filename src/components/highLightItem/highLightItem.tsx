import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import {
  FaBullseye,
  FaHammer,
  FaHandsHelping,
  FaLightbulb,
  FaSmile,
  FaTachometerAlt,
} from "react-icons/fa";

const HighLightItems = () => {
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  const highLightItemsArray = [
    {
      id: 1,
      title: "Adaptable performance",
      description:
        "Our product effortlessly adjusts to your needs, boosting efficiency and simplifying your tasks.",
      icon: <FaTachometerAlt />,
    },
    {
      id: 2,
      title: "Built to last",
      description:
        "Experience unmatched durability that goes above and beyond with lasting investment.",
      icon: <FaHammer />,
    },
    {
      id: 3,
      title: "Great user experience",
      description:
        "Integrate our product into your routine with an intuitive and easy-to-use interface.",
      icon: <FaSmile />,
    },
    {
      id: 4,
      title: "Innovative functionality",
      description:
        "Stay ahead with features that set new standards, addressing your evolving needs better than the rest.",
      icon: <FaLightbulb />,
    },
    {
      id: 5,
      title: "Reliable support",
      description:
        "Count on our responsive customer support, offering assistance that goes beyond the purchase.",
      icon: <FaHandsHelping />,
    },
    {
      id: 6,
      title: "Precision in every detail",
      description:
        "Enjoy a meticulously crafted product where small touches make a significant impact on your overall experience.",
      icon: <FaBullseye />,
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 920);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    AOS.init({ duration: 1000, once: true });
  }, []);

  const getAosAnimation = (id: number) => {
    if (isDesktop) {
      switch (id) {
        case 1:
          return "fade-down-right";
        case 2:
          return "fade-down";
        case 3:
          return "fade-down-left";
        case 4:
          return "fade-up-right";
        case 5:
          return "fade-up";
        case 6:
          return "fade-up-left";
        default:
          "fade-right";
      }
    } else {
      return id % 2 === 0 ? "fade-left" : "fade-right";
    }
  };

  return (
    <div
      className="grid grid-cols-1 xs:grid-cols-2 md2:grid-cols-3 md2:gap-3.5 gap-y-5 xs:gap-2.5 w-11/12 mx-auto
      xl:max-w-[1280px]"
    >
      {highLightItemsArray.map((item) => (
        <div
          key={item.id}
          className="bg-[#0b0e14] border-2 border-gray-300/5 rounded-md flex flex-col gap-y-1 p-5"
          data-aos={getAosAnimation(item.id)}
        >
          <span className="text-[#1184f7] text-xl md2:text-2xl">
            {item.icon}
          </span>

          <p className="text-gray-200 font-medium md2:text-base xl:text-lg">
            {item.title}
          </p>

          <p className="text-gray-400 text-[13px] md2:text-base">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default HighLightItems;
