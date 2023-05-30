import "./styles/index.scss";
import "~/shared/config/i18n/i18n";

import { Suspense, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import { Footer } from "~/components/Footer";
import { Navbar } from "~/components/Navbar";
import { Sidebar } from "~/components/Sidebar";
import { getCategories, getCategoryFood } from "~/redux/categories/operations";
import { selectPageIsLoading } from "~/redux/categories/selectors";
import { selectActiveCategory } from "~/redux/user/selectors";
import { MAIN_PAGE_FOOD } from "~/shared/const/const";
import { Loader } from "~/shared/ui/Loader/Loader";

import AppRouter from "./providers/routes/ui/AppRouter";
import { AppDispatch } from "./providers/StoreProvider/config/config";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const activeCategory = useSelector(selectActiveCategory);
  const isLoading = useSelector(selectPageIsLoading);

  useEffect(() => {
    dispatch(getCategoryFood(activeCategory ? activeCategory : MAIN_PAGE_FOOD));
    dispatch(getCategories());
  }, [activeCategory, dispatch]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="app">
      <Suspense fallback="">
        <Navbar />
        <main className="content-page">
          <Sidebar />
          <AppRouter />
        </main>
      </Suspense>
      <Toaster />
      <Footer />
    </div>
  );
};

export default App;
