import type { CompaniesType, ProductFeturesType } from "../types/homePageType";
import { FaMobileAlt } from "react-icons/fa";
import { MdDashboard, MdDevices } from "react-icons/md";

export const CompaniesArray: CompaniesType[] = [
  {
    id: 1,
    src: "/images/companies/company1.svg",
    alt: "Company1",
    aos: "fade-down-right",
  },
  {
    id: 2,
    src: "/images/companies/company2.svg",
    alt: "Company2",
    aos: "fade-down-left",
  },
  {
    id: 3,
    src: "/images/companies/company3.svg",
    alt: "Company3",
    aos: "fade-right",
  },
  {
    id: 4,
    src: "/images/companies/company4.svg",
    alt: "Company4",
    aos: "fade-left",
  },
  {
    id: 5,
    src: "/images/companies/company5.svg",
    alt: "Company5",
    aos: "fade-up-right",
  },
  {
    id: 6,
    src: "/images/companies/company6.svg",
    alt: "Company6",
    aos: "fade-up-left",
  },
];

export const ProductFeaturesArray: ProductFeturesType[] = [
  {
    id: 1,
    title: "Dashboard",
    description:
      "This item could provide a snapshot of the most important metrics or data points related to the product.",
    darkSrc: "/images/product_features/dash-dark.png",
    lightSrc: "/images/product_features/dash-light.png",
    icon: <MdDashboard />,
  },
  {
    id: 2,
    title: "Mobile integration",
    description:
      "This item could provide information about the mobile app version of the product.",
    darkSrc: "/images/product_features/mobile-dark.png",
    lightSrc: "/images/product_features/mobile-light.png",
    icon: <FaMobileAlt />,
  },
  {
    id: 3,
    title: "Available on all platforms",
    description:
      "This item could let users know the product is available on all platforms, such as web, mobile, and desktop.",
    darkSrc: "/images/product_features/devices-dark.png",
    lightSrc: "/images/product_features/devices-light.png",
    icon: <MdDevices />,
  },
];
