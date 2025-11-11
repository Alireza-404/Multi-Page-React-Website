import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";

const Testimonials = () => {
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  const testimonialsArray = [
    {
      id: 1,
      name: "Remy Sharp",
      description:
        "I absolutely love how versatile this product is! Whether I'm tackling work projects or indulging in my favorite hobbies, it seamlessly adapts to my changing needs. Its intuitive design has truly enhanced my daily routine, making tasks more efficient and enjoyable.",
      level: "Senior Engineer",
      profile: "/images/testimonials/profile1.jpg",
      company: "/images/companies/company1.svg",
    },

    {
      id: 2,
      name: "Travis Howard",
      description:
        "One of the standout features of this product is the exceptional customer support. In my experience, the team behind this product has been quick to respond and incredibly helpful. It's reassuring to know that they stand firmly behind their product.",
      level: "Lead Product Designer",
      profile: "/images/testimonials/profile2.jpg",
      company: "/images/companies/company2.svg",
    },

    {
      id: 3,
      name: "Cindy Baker",
      description:
        "The level of simplicity and user-friendliness in this product has significantly simplified my life. I appreciate the creators for delivering a solution that not only meets but exceeds user expectations.",
      level: "CTO",
      profile: "/images/testimonials/profile3.jpg",
      company: "/images/companies/company3.svg",
    },

    {
      id: 4,
      name: "Julia Stewart",
      description:
        "I appreciate the attention to detail in the design of this product. The small touches make a big difference, and it's evident that the creators focused on delivering a premium experience.",
      level: "Senior Engineer",
      profile: "/images/testimonials/profile4.jpg",
      company: "/images/companies/company4.svg",
    },

    {
      id: 5,
      name: "John Smith",
      description:
        "I've tried other similar products, but this one stands out for its innovative features. It's clear that the makers put a lot of thought into creating a solution that truly addresses user needs.",
      level: "Product Designer",
      profile: "/images/testimonials/profile5.jpg",
      company: "/images/companies/company5.svg",
    },

    {
      id: 6,
      name: "Daniel Wolf",
      description:
        "The quality of this product exceeded my expectations. It's durable, well-designed, and built to last. Definitely worth the investment!",
      level: "CDO",
      profile: "/images/testimonials/profile6.jpg",
      company: "/images/companies/company6.svg",
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
    <div className="grid grid-cols-1 xs:grid-cols-2 md2:grid-cols-3 xs:gap-2.5 md2:gap-3.5 gap-y-5 mt-7">
      {testimonialsArray.map((item) => (
        <div
          key={item.id}
          className="border-2 border-gray-300/50 dark:border-gray-600/40 p-4 rounded-md flex flex-col gap-y-5
          justify-between"
          data-aos={getAosAnimation(item.id)}
        >
          <p className="text-sm md2:text-[14.75px] text-gray-500 dark:text-gray-400 xl:text-base">
            {item.description}
          </p>

          <div className="flex items-center justify-between gap-x-1">
            <div className="flex items-center gap-x-3">
              <img
                loading="lazy"
                src={item.profile}
                alt={`Profile-${item.id}`}
                className="w-12 h-12 rounded-full xl:w-14 xl:h-14"
              />

              <div className="flex flex-col">
                <span className="text-slate-800 dark:text-gray-200 font-medium xl:text-lg">
                  {item.name}
                </span>
                <span className="text-sm text-[#027af2]">{item.level}</span>
              </div>
            </div>

            <img
              loading="lazy"
              src={item.company}
              width={64}
              alt={`Company-${item.id}`}
              className="opacity-50 block dark:hidden xl:w-20"
            />

            <img
              loading="lazy"
              src={`/images/companies/dark_company${item.id}.svg`}
              width={64}
              alt={`Company-${item.id}`}
              className="opacity-50 hidden dark:block xl:w-20"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Testimonials;
