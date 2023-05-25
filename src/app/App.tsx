import { Suspense, useEffect } from 'react';
import { Navbar } from '~/components/Navbar';
import AppRouter from './providers/routes/ui/AppRouter';
import "./styles/index.scss";
import { Sidebar } from '~/components/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from './providers/StoreProvider/config/config';
import { MAIN_PAGE_FOOD } from '~/shared/const/const';
import { getCategoryFood } from '~/redux/categories/operations';
import { Toaster } from 'react-hot-toast';
import { Footer } from '~/components/Footer';
import { selectActiveCategory } from '~/redux/user/selectors';

const App = () => {

  const dispatch = useDispatch<AppDispatch>()
  const activeCategory = useSelector(selectActiveCategory)

  useEffect(() => {
    dispatch(getCategoryFood(activeCategory ? activeCategory : MAIN_PAGE_FOOD))
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
}

export default App