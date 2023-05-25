import { Suspense, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Navbar } from "~/components/Navbar";
import { Sidebar } from "~/components/Sidebar";
import { Footer } from "~/components/Footer";
import AppRouter from "./providers/routes/ui/AppRouter";
import { AppDispatch } from "./providers/StoreProvider/config/config";
import { getCategoryFood } from "~/redux/categories/operations";
import { selectActiveCategory } from "~/redux/user/selectors";
import { MAIN_PAGE_FOOD } from "~/shared/const/const";
import "./styles/index.scss";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const activeCategory = useSelector(selectActiveCategory);

  useEffect(() => {
    dispatch(getCategoryFood(activeCategory ? activeCategory : MAIN_PAGE_FOOD));
  }, [activeCategory, dispatch]);

  return (
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
