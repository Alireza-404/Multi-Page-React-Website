import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { UpdateStringField } from "../redux/slices/fieldsSlice";
import Navbar from "../components/navbar/navbar";
import CategoryBox from "../components/categoryBox/categoryBox";
import LatestBox from "../components/latestBox/latestBox";
import Footer from "../components/footer/footer";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  CategoriesArray,
  categoryButtons,
  LatestArray,
} from "../data/blogPageData";
import type { CategoriesType } from "../types/blogPageType";

const BlogPage = () => {
  // Redux
  const field = useSelector((state: RootState) => state.fields);
  const dispatch = useDispatch<AppDispatch>();

  // Categories
  const [activeCategoriesButton, setActiveCategoriesButton] =
    useState<number>(1);
  const [finallyCategories, setFinallyCategories] = useState<CategoriesType[]>(
    []
  );

  // Latest
  const [numberOfLatest, setNumberofLatest] = useState<4 | 6>(
    window.innerWidth >= 1024 ? 6 : 4
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(LatestArray.length / numberOfLatest);

  const startIndex = (currentPage - 1) * numberOfLatest;

  const currentLatest = LatestArray.slice(
    startIndex,
    startIndex + numberOfLatest
  );

  console.log(startIndex, startIndex + numberOfLatest);

  useEffect(() => {
    const foundedActiveButton = categoryButtons.find(
      (btn) => btn.id === activeCategoriesButton
    );

    if (foundedActiveButton?.title === "All categories") {
      setFinallyCategories(() => CategoriesArray.map((category) => category));
    } else {
      const filteredArray = CategoriesArray.filter(
        (category) => category.type === foundedActiveButton?.title
      );

      setFinallyCategories(filteredArray);
    }

    AOS.refresh();
  }, [activeCategoriesButton]);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    window.scrollTo(0, 0);

    window.addEventListener("resize", () => {
      setNumberofLatest(window.innerWidth >= 1024 ? 6 : 4);
    });
  }, []);

  const searchHandler = () => {
    if (field.searchForBlogPage) {
      const foundedCategories = CategoriesArray.filter((item) =>
        item.title
          .toLowerCase()
          .includes(field.searchForBlogPage.toLocaleLowerCase())
      );

      setFinallyCategories(foundedCategories);
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-[#05070a] min-h-screen">
      <Navbar />

      <div
        className="w-11/12 xl:full pt-36 mx-auto xl:max-w-[1280px] flex flex-col gap-y-6"
        data-aos="fade-right"
      >
        <h1 className="text-slate-800 dark:text-gray-200 font-bold text-5xl">
          Blog
        </h1>

        <p className="text-slate-800 dark:text-gray-200 font-medium text-sm">
          Stay in the loop with the latest about our products
        </p>
      </div>

      <main>
        <section
          className="w-11/12 xl:w-full mt-14 mx-auto xl:max-w-[1280px] flex flex-col md2:flex-row-reverse
          md2:justify-between md2:gap-x-6 gap-y-7"
        >
          <div className="flex items-center gap-x-2 md2:gap-x-3 lg:gap-x-3.5">
            <div className="relative w-full" data-aos="fade-right">
              <input
                type="text"
                value={field.searchForBlogPage}
                name="blog-search-input"
                placeholder="Search..."
                spellCheck={false}
                maxLength={24}
                onChange={(event) => {
                  const value = event.target.value;

                  dispatch(
                    UpdateStringField({ name: "searchForBlogPage", value })
                  );

                  if (!value) {
                    const foundedActiveButton = categoryButtons.find(
                      (btn) => btn.id === activeCategoriesButton
                    );

                    if (foundedActiveButton?.title === "All categories") {
                      setFinallyCategories(() =>
                        CategoriesArray.map((category) => category)
                      );
                    } else {
                      const filteredArray = CategoriesArray.filter(
                        (category) =>
                          category.type === foundedActiveButton?.title
                      );

                      setFinallyCategories(filteredArray);
                    }
                  }
                }}
                className="w-full text-sm border-2 bg-transparent border-gray-300/50 outline-none rounded-md pr-2 py-1.5 
                pl-9 focus:border-gray-400/65 dark:border-gray-600/40 
              dark:focus:border-gray-500/50 dark:text-gray-200 xs:text-base md:px-4 md:pl-9"
              />

              <span className="text-slate-800 dark:text-gray-200 absolute top-1/2 left-3 -translate-y-1/2 text-[15px]">
                <FaSearch />
              </span>
            </div>

            <span
              data-aos="fade-left"
              className="border-2 bg-transparent border-gray-300/50 dark:border-gray-600/40 
              w-20 h-9 xs:w-22 xs:h-10 xl:w-28 rounded-md flex items-center justify-center hover:bg-gray-200
              dark:hover:bg-[#333b4d4d] transition-all duration-200 cursor-pointer
              text-sm xs:text-base text-slate-800 dark:text-gray-200"
              onClick={searchHandler}
            >
              Search
            </span>
          </div>

          <div className="flex items-center  gap-x-2 md2:gap-x-3 lg:gap-x-3.5 overflow-x-auto scrollbar-hide">
            {categoryButtons.map((btn) => {
              return (
                <button
                  key={btn.id}
                  type="button"
                  data-aos="zoom-in"
                  className={`rounded-full text-sm px-3 py-1.5 font-medium dark:font-normal transition-all duration-200
                    flex-shrink-0 border border-gray-300/50 dark:border-gray-600/40 ${
                      btn.id === activeCategoriesButton
                        ? " bg-gray-200 dark:bg-[#05070a] text-slate-800 dark:text-gray-200"
                        : "bg-gray-100  dark:bg-[#0b0e14] text-gray-500 dark:text-gray-400"
                    }`}
                  onClick={() => {
                    setActiveCategoriesButton(btn.id);

                    if (activeCategoriesButton !== btn.id) {
                      dispatch(
                        UpdateStringField({
                          name: "searchForBlogPage",
                          value: "",
                        })
                      );
                    }
                  }}
                >
                  {btn.title}
                </button>
              );
            })}
          </div>
        </section>

        <section className="w-11/12 xl:w-full mt-7 mx-auto xl:max-w-[1280px] pt-7 flex flex-col gap-y-4">
          <AnimatePresence>
            <>
              <div className="flex flex-col gap-y-5 md2:grid md2:grid-cols-2 md2:gap-4">
                {finallyCategories.slice(0, 2).map((category) => {
                  return (
                    <CategoryBox
                      key={`${category.id}_${activeCategoriesButton}`}
                      category={category}
                      activeCategoriesButton={activeCategoriesButton}
                    />
                  );
                })}
              </div>

              <div className="flex flex-col gap-y-5 md2:grid md2:grid-cols-3 md2:gap-4">
                {finallyCategories[2] && (
                  <CategoryBox
                    key={`${finallyCategories[2].id}_${activeCategoriesButton}`}
                    category={finallyCategories[2]}
                    activeCategoriesButton={activeCategoriesButton}
                  />
                )}

                <div className="flex flex-col gap-y-5 md2:gap-4 justify-between">
                  {finallyCategories.slice(3, 5).map((category) => (
                    <CategoryBox
                      key={`${category.id}_${activeCategoriesButton}`}
                      category={category}
                      activeCategoriesButton={activeCategoriesButton}
                    />
                  ))}
                </div>

                {finallyCategories[5] && (
                  <CategoryBox
                    key={`${finallyCategories[5].id}_${activeCategoriesButton}`}
                    category={finallyCategories[5]}
                    activeCategoriesButton={activeCategoriesButton}
                  />
                )}
              </div>
            </>
          </AnimatePresence>
        </section>

        <div className="py-[72px]">
          <span className="bg-gray-300/50 dark:bg-gray-600/40 block w-full h-0.5 dark:h-px"></span>
        </div>

        <section className="w-11/12 xl:w-full mx-auto xl:max-w-[1280px] flex flex-col gap-y-10">
          <p className="text-slate-800 dark:text-gray-200 font-bold text-4xl">
            Latest
          </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 md:gap-x-10 gap-y-10 lg:h-[610px] content-start"
            >
              {currentLatest.map((item) => (
                <LatestBox key={item.id} items={item} />
              ))}
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center gap-x-3.5">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrentPage(i + 1)}
                className={`w-7 h-7 xs:w-8 xs:h-8 rounded-full text-sm font-bold transition-all duration-200 ${
                  i + 1 === currentPage
                    ? `bg-slate-800 text-gray-100 md2:hover:bg-slate-700 dark:text-slate-800 dark:bg-gray-100
                    dark:md2:hover:bg-gray-300`
                    : `bg-transparent text-slate-800 dark:text-gray-200 md2:hover:bg-gray-300
                    dark:md2:hover:bg-slate-800`
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </section>

        <div className="pt-[72px]">
          <span className="bg-gray-300/50 dark:bg-gray-600/40 block w-full h-0.5 dark:h-px"></span>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPage;
