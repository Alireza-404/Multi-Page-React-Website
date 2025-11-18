import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { UpdateStringField } from "../redux/slices/fieldsSlice";
import { AnimatePresence, motion } from "framer-motion";
import { CompaniesArray, ProductFeaturesArray } from "../data/homePageData";
import Typewriter from "typewriter-effect";
import Navbar from "../components/navbar/navbar";
import Testimonials from "../components/testimonials/testimonials";
import HighLightItems from "../components/highLightItem/highLightItem";
import Pricing from "../components/pricing/pricing";
import Accordion from "../components/accordion/accordion";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "../components/footer/footer";
import { Link } from "react-router-dom";

const HomePage = () => {
  const field = useSelector((state: RootState) => state.fields);
  const dispatch = useDispatch<AppDispatch>();
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const [activeButton, setActiveButton] = useState(1);

  const getAosAnimation = (id: number, aosAnimation: string) => {
    if (isDesktop) {
      return id % 2 === 0 ? "fade-up" : "fade-down";
    } else {
      return aosAnimation;
    }
  };

  const activeFeature = ProductFeaturesArray.find(
    (feature) => feature.id === activeButton
  );

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 920);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    window.scrollTo(0, 0);

    AOS.init({ duration: 1200, once: true });
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [activeButton, isDesktop]);

  return (
    <div className="bg-gray-100 dark:bg-[#05070a] overflow-x-hidden">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 rounded-full z-20 w-72 md:w-96 h-20 
      dark:bg-blue-500/55 blur-3xl md2:w-[800px] xl:w-[1250px] dark:lg:blur-[170px] 2xl:w-[1500px] lg:blur-[80px] 
      dark:lg:h-28 lg:-top-5 lg:h-32 bg-blue-500/60"
      ></div>

      <Navbar />

      <header className="pt-[160px] w-11/12 xl:w-full mx-auto">
        <h1
          className="text-slate-800 dark:text-gray-200 text-4xl flex flex-col gap-y-1 items-center font-bold
          xs:text-[54px] xs:flex-row xs:justify-center xs:gap-x-3 md:text-6xl text-center"
          data-aos="fade-down"
        >
          <Typewriter
            options={{
              strings: [
                `<span>Our Latest</span> <span style="color:#027af2">Products</span>`,
                `<span>Discover</span> <span style="color:#027af2">Innovation</span>`,
                `<span>Quality You</span> <span style="color:#027af2">Trust</span>`,
                `<span>Modern.</span> <span style="color:#027af2">Minimal.</span>`,
                `<span>Powerful</span> <span style="color:#027af2">Design</span>`,
              ],
              autoStart: true,
              loop: true,
              delay: 80,
              deleteSpeed: 45,
            }}
          />
        </h1>

        <p
          className="text-gray-500 dark:text-gray-400 text-center text-sm mt-3 xs:mt-6 mx-auto
          xs:w-96 xs:text-base md:text-lg md:w-[450px] lg:w-[700px]"
          data-aos="fade-up"
        >
          Explore our cutting-edge dashboard, delivering high-quality solutions
          tailored to your needs. Elevate your experience with top-tier features
          and services.
        </p>

        <div data-aos="fade-right">
          <div className="flex flex-col xs:flex-row xs:gap-x-4 xs:justify-center gap-y-3 mt-7">
            <input
              type="email"
              autoComplete="email"
              placeholder="Your email address"
              value={field.enterEmailInHeader}
              onChange={(event) => {
                const value = event.target.value;
                dispatch(
                  UpdateStringField({ name: "enterEmailInHeader", value })
                );
              }}
              className="text-sm border-2 bg-transparent border-gray-300/50 outline-none rounded-md px-2 py-1.5 
              focus:border-gray-400/65 dark:border-gray-600/40 dark:focus:border-gray-500/50 dark:text-gray-200
              xs:w-60 xs:text-base md:w-80 md:px-4 md:py-2.5"
            />

            <button
              type="button"
              className="bg-slate-800 rounded-md hover:bg-slate-700 text-gray-100 font-semibold py-2
              transition duration-200 dark:bg-gray-200 dark:hover:bg-white/75 dark:text-[#05070a] text-sm
              xs:text-base xs:px-2.5"
            >
              Start now
            </button>
          </div>

          <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 text-center mt-3">
            By clicking "Start now" you agree to our{" "}
            <span
              className="text-slate-800 dark:text-gray-200 font-semibold underline underline-offset-[3px]
            cursor-pointer"
            >
              Terms & Conditions
            </span>
            .
          </p>
        </div>
      </header>

      <main>
        <section className="w-11/12 xl:w-full mt-14 mx-auto xl:max-w-[1280px]">
          <div>
            <div className="items-center justify-center gap-x-1 md:gap-x-2.5 hidden md2:flex xl:hidden">
              <span className="bg-gray-300/50 dark:bg-gray-600/40 block w-32 h-0.5 dark:h-px"></span>

              <Link to={"/dashboard"}>
                <p
                  className="text-slate-800 dark:text-gray-200 font-semibold underline underline-offset-[3px]
                  cursor-pointer text-center mb-4 text-xs md:text-sm lg:text-base"
                >
                  Go to Dashboard
                </p>
              </Link>

              <span className="bg-gray-300/50 dark:bg-gray-600/40 block w-32 h-0.5 dark:h-px"></span>
            </div>

            <div
              className="overflow-hidden rounded-md border-2
          border-gray-300/50 shadow-lg shadow-gray-400/65 lg:rounded-2xl"
              data-aos="fade-left"
            >
              <div
                className="bg-[url('/images/home_page_header/light_dashboard.jpg')] bg-cover bg-left h-80 w-[600px]
              dark:hidden block xs:h-[570px] xs:w-full lg:h-[700px]"
              ></div>
              <div
                className="bg-[url('/images/home_page_header/dark_dashboard.jpg')] bg-cover bg-left h-80 w-[600px]
            dark:block hidden xs:h-[570px] xs:w-full lg:h-[700px]"
              ></div>
            </div>
          </div>

          <div className="mt-24 flex flex-col items-center gap-y-8">
            <p className="text-gray-500 dark:text-gray-400 text-sm text-center xs:text-base md:text-lg">
              Trusted by the best companies
            </p>

            <div
              className="grid grid-cols-2 xs:grid-cols-3 gap-x-16 gap-y-8 overflow-hidden
              sm:flex sm:flex-wrap sm:justify-center"
              id="product-features-section"
            >
              {CompaniesArray.map((company) => (
                <div key={company.id} className="flex items-center">
                  <img
                    loading="lazy"
                    src={company.src}
                    alt={company.alt}
                    data-aos={getAosAnimation(company.id, company.aos)}
                    width={95}
                    className="h-auto !opacity-50 block dark:hidden lg:w-[115px]"
                    data-aos-duration="650"
                  />
                  <img
                    loading="lazy"
                    src={`/images/companies/dark_company${company.id}.svg`}
                    alt={company.alt}
                    data-aos={getAosAnimation(company.id, company.aos)}
                    width={95}
                    className="h-auto !opacity-50 dark:block hidden lg:w-[115px]"
                    data-aos-duration="650"
                  />
                </div>
              ))}
            </div>
          </div>

          <div
            className="mt-24 flex flex-col gap-y-3"
            id="mobile-product-features-section"
          >
            <p className="text-2xl xs:text-3xl xl:text-[33px] text-slate-800 dark:text-gray-200 font-semibold">
              Product features
            </p>

            <p className="text-gray-500 dark:text-gray-400 text-sm xs:text-base xl:text-[17px] xl:w-[750px]">
              Provide a brief overview of the key features of the product. For
              example, you could list the number of features, their types or
              benefits, and add-ons.
            </p>
          </div>

          <div className="md2:flex md2:gap-x-5 md2:flex-row-reverse">
            <div
              className="flex xs:flex-col xs:gap-y-7 md:gap-y-5 items-center gap-x-2 overflow-x-auto scrollbar-hide xs:mt-5 mt-3"
              data-aos="zoom-out"
              data-aos-duration="650"
            >
              {ProductFeaturesArray.map((feature) => (
                <button
                  type="button"
                  key={feature.id}
                  className={`rounded-full px-4 py-1.5 text-xs flex-shrink-0 font-semibold
                    xs:text-sm xs:hidden ${
                      feature.id === activeButton
                        ? "bg-[#027af2] text-gray-100 transition duration-200"
                        : `bg-gray-200 text-gray-500 dark:text-gray-400 dark:bg-[#05070a] dark:hover:bg-[#0f141c]
                      border-2 dark:border-gray-600/40 border-gray-300/50`
                    }`}
                  onClick={() => setActiveButton(feature.id)}
                >
                  {feature.title}
                </button>
              ))}

              {ProductFeaturesArray.map((feature) => (
                <button
                  key={feature.id}
                  type="button"
                  className={`w-full rounded-md hidden xs:block md2:w-96 xl:w-[550px] dark:hover:bg-[#333b4d4d] transition-all duration-200
                              p-5 border-2 border-gray-300/50 dark:border-gray-600/40 hover:bg-gray-200 ${
                                feature.id === activeButton
                                  ? "bg-gray-300 dark:bg-[#181e27] hover:bg-gray-300 dark:hover:bg-[#181e27]"
                                  : "bg-transparent"
                              }`}
                  onClick={() => {
                    setActiveButton(feature.id);
                  }}
                  data-aos={feature.id % 2 === 0 ? "fade-left" : "fade-right"}
                >
                  <div
                    className={`flex flex-col items-start gap-y-2 text-start ${
                      feature.id === activeButton
                        ? "text-slate-800 dark:text-gray-200"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    <span
                      className={`font-medium md2:text-xl ${
                        feature.id === activeButton
                          ? "text-slate-800 dark:text-gray-200"
                          : "text-slate-800 dark:text-gray-400"
                      }`}
                    >
                      {feature.icon}
                    </span>
                    <p className="font-medium">{feature.title}</p>
                    <p className="font-medium">{feature.description}</p>
                  </div>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <div
                className="border-2 border-gray-300/50 dark:border-gray-600/40 rounded-md mt-7 flex flex-col
              gap-y-4 px-1.5 pt-4 pb-5 md2:mt-5 md2:flex-grow"
              >
                {activeFeature && (
                  <motion.div
                    key={activeFeature.id}
                    initial={{ opacity: 0, y: -35 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 35 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center justify-center gap-y-2.5 h-full overflow-hidden"
                  >
                    <img
                      loading="lazy"
                      src={activeFeature.lightSrc}
                      className="h-64 w-96 xl:w-[570px] xl:h-96 object-cover dark:hidden block"
                    />
                    <img
                      loading="lazy"
                      src={activeFeature.darkSrc}
                      className="h-64 w-96 xl:w-[570px] xl:h-96 object-cover hidden dark:block"
                    />

                    <div className="flex flex-col gap-y-1.5 px-3.5 xs:hidden">
                      <p className="text-sm text-slate-800 dark:text-gray-200 font-medium">
                        {activeFeature.title}
                      </p>

                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {activeFeature.description}
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </AnimatePresence>
          </div>
        </section>

        <div className="mt-[44px] pt-7" id="testimonials-section">
          <span className="bg-gray-300/50 dark:bg-gray-600/40 block w-full h-0.5 dark:h-px"></span>
        </div>

        <section className="w-11/12 xl:w-full block mx-auto xl:max-w-[1280px]">
          <div className="flex flex-col xl:items-center gap-y-3 pt-[72px]">
            <p className="text-slate-800 dark:text-gray-200 font-semibold text-2xl xs:text-3xl xl:text-[33px]">
              Testimonials
            </p>

            <p
              className="text-sm text-gray-500 dark:text-gray-400 xs:text-base xl:text-[17px] xl:w-[750px]
              xl:text-center"
            >
              See what our customers love about our products. Discover how we
              excel in efficiency, durability, and satisfaction. Join us for
              quality, innovation, and reliable support.
            </p>
          </div>

          <Testimonials />
        </section>

        <section
          className="mt-[72px] flex flex-col gap-y-7 xl:gap-y-12 px-4 py-16 bg-[#05070a] dark:border-y-2 dark:border-gray-600/40
            "
          data-aos="flip-up"
          id="highlights-section"
        >
          <div className="flex flex-col gap-y-2 w-11/12 mx-auto xl:w-full xl:items-center">
            <p className="text-2xl xs:text-3xl xl:text-[33px] font-semibold text-gray-200">
              Highlights
            </p>
            <p className="text-gray-400 text-sm xs:text-base xl:text-[17px] xl:text-center xl:w-[750px]">
              Explore why our product stands out: adaptability, durability,
              user-friendly design, and innovation. Enjoy reliable customer
              support and precision in every detail.
            </p>
          </div>

          <HighLightItems />
        </section>

        <section
          className="pt-[72px] w-11/12 xl:w-full block mx-auto xl:max-w-[1280px]"
          id="pricing-section"
        >
          <div className="flex flex-col gap-y-3 xl:items-center">
            <p className="text-2xl xs:text-3xl xl:text-[33px] font-semibold text-slate-800 dark:text-gray-200">
              Pricing
            </p>
            <p className="text-sm xs:text-base text-gray-500 dark:text-gray-400 xl:text-[17px] xl:w-[750px] xl:text-center">
              Quickly build an effective pricing table for your potential
              customers with this layout. It's built with default Material UI
              components with little customization.
            </p>
          </div>

          <Pricing />
        </section>

        <div className="mt-[44px] pt-7" id="FAQ-section">
          <span className="bg-gray-300/50 dark:bg-gray-600/40 dark:h-px block w-full h-0.5"></span>
        </div>

        <section className="pt-[72px] w-11/12 xl:w-full block mx-auto">
          <p
            className="text-slate-800 dark:text-gray-200 font-semibold text-center text-2xl xs:text-3xl
          xl:text-[33px]"
          >
            Frequently asked questions
          </p>

          <Accordion />
        </section>

        <div className="mt-[72px]">
          <span className="bg-gray-300/50 dark:bg-gray-600/40 dark:h-px block w-full h-0.5"></span>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
