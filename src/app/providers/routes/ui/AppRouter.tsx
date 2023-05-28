import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { routeConfig } from "~/shared/config/routeConfig/routeConfig";
import { Loader } from "~/shared/ui/Loader/Loader";

const AppRouter = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {Object.values(routeConfig).map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={<section className="page-wrapper">{element}</section>}
          />
        ))}
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
