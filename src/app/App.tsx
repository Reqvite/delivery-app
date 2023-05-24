import { Suspense } from 'react';
import { Navbar } from '~/components/Navbar';
import AppRouter from './providers/routes/ui/AppRouter';
import "./styles/index.scss";
import { Sidebar } from '~/components/Sidebar';

const App = () => {

  return (
    <div className="app">
      <Suspense fallback="">
        <Navbar />
        <main className="content-page">
          <Sidebar />
          <AppRouter />
        </main>
      </Suspense>
    </div>
  );
}

export default App