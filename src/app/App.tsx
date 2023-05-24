import { Suspense} from 'react';
import { Navbar } from '~/components/Navbar';
import AppRouter from './providers/routes/ui/AppRouter';
import  "./styles/index.scss";
import { SideBar } from '~/components/Sidebar/ui/Sidebar/Sidebar';

const App = () => {

  return (
    <div className="app">
      <Suspense fallback="">
        <Navbar />
        <main className="content-page">
          <SideBar/>
          <AppRouter />
        </main>
      </Suspense>
    </div>
  );
}

export default App