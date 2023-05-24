import { Suspense, useEffect } from 'react';
import { Navbar } from '~/components/Navbar';
import AppRouter from './providers/routes/ui/AppRouter';
import "./styles/index.scss";
import { Sidebar } from '~/components/Sidebar';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './providers/StoreProvider/config/config';
import { MAIN_PAGE_FOOD } from '~/shared/const/const';
import { getCategoryFood } from '~/redux/categories/operations';
import { Toaster } from 'react-hot-toast';

const App = () => {

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(getCategoryFood(MAIN_PAGE_FOOD))
  }, [dispatch]);

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
    </div>
  );
}

export default App