import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../features/home/pages/HomePage";
import ContactPage from "../features/contact/pages/ContactPage";
import NotFound from "../pages/NotFound";
import AboutUs from "../features/about/pages/AboutUs";
import CareerPage from "../features/career/pages/CareerPage";
import PrivacyPolicy from "../features/privacypolicy/pages/PrivacyPolicy";
import TermsCondition from "../features/termscondition/pages/TermsCondition";
import HelpCenter from "../features/helpcenter/pages/HelpCenter";
import HelpItem from "../features/helpcenter/pages/HelpItem";
import FavoritPages from "../features/favorit/pages/FavoritPages";
import CheckoutPages from "../features/checkout/pages/CheckoutPages";
import RecommendationPages from "../features/recomendation/pages/RecomendationPages";
import ReviewPages from "../features/review/pages/ReviewPages";
import CityPages from "../features/city/pages/CityPages";
import PointOfInterestPages from "../features/pointofinterest/pages/PointOfInterestPages";
import FilterPages from "../features/filter/pages/FilterPages";
import StatusBookingPages from "../features/statusbooking/pages/StatusBookingPages";
import CorporateCategoryPages from "../features/corporatecategory/pages/CorporateCategoryPages";
import FormPengajuanPaketKorporasi from "../features/corporatecategory/pages/FormPengajuanPaketKorporasi";
import PaymentPages from "../features/payment/pages/PaymentPages";
import SuccessPayment from "../features/payment/pages/SuccessPayment";
import ProductDetailPages from "../features/produtdetail/pages/ProductDetailPages";
import OptionDetailPages from "../features/produtdetail/pages/OptionDetailPages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'contact-us',
        element: <ContactPage />
      },
      {
        path: 'about-us',
        element: <AboutUs />
      },
      {
        path: 'career',
        element: <CareerPage />
      },
      {
        path: "*",
        element: <NotFound />,
      },
      {
        path: 'help-center',
        element: <HelpCenter/>
      },
      {
        path: "help-center/item/:id",
        element: <HelpItem />,
      },
      {
        path: "favorit",
        element: <FavoritPages />
      },
      {
        path: "cart",
        element: <CheckoutPages />
      },
      {
        path: "recommendations",
        element: <RecommendationPages/>
      },
      {
        path: "/city/:city",
        element: <CityPages />
      },
      {
        path: "point-of-interest/:city/:poi",
        element: <PointOfInterestPages />
      },
      {
        path: "/search/filter",
        element: <FilterPages />
      },
      {
        path: "/status-booking",
        element: <StatusBookingPages />
      },
      {
        path: "/korporasi",
        element: <CorporateCategoryPages/>
      },
      {
        path: "/korporasi/pengajuan",
        element: <FormPengajuanPaketKorporasi/>
      },
      {
        path: "/payment/:token",
        element: <PaymentPages />,
      },
      {
        path: "payment/success/:token",
        element: <SuccessPayment />,
      },
      {
        path: "/travels/:slug",
        element: <ProductDetailPages/>,
      },
      {
        path: "/travels/:slug/option/:optionId",
        element: <OptionDetailPages />,
      }
    ],
  },
  {
    path: "/terms-condition",
    element: <TermsCondition />,
  },
  {
    path: '/privacy-policy',
    element: <PrivacyPolicy/>
  },
  {
    path: "/review/:token",
    element: <ReviewPages />
  }
]);