import { Suspense, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Navbar } from "~/components/Navbar";
import { Sidebar } from "~/components/Sidebar";
import { Footer } from "~/components/Footer";
import AppRouter from "./providers/routes/ui/AppRouter";
import { AppDispatch } from "./providers/StoreProvider/config/config";
import { getCategories, getCategoryFood } from "~/redux/categories/operations";
import { selectActiveCategory } from "~/redux/user/selectors";
import { MAIN_PAGE_FOOD } from "~/shared/const/const";
import { selectPageIsLoading } from "~/redux/categories/selectors";
import { Loader } from "~/shared/ui/Loader/Loader";
import "./styles/index.scss";

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
