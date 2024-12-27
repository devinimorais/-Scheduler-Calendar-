import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const LazyNotFound = React.lazy(() => import("../pages/not-found/NotFound"));
const LazyServices = React.lazy(() => import("../pages/servicess/Services"));
const LazyProfessionals = React.lazy(() => import("../pages/professionals/Professionals"));
const LazyBookTime = React.lazy(() => import("../pages/BookTimes/Book times"));

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path="*"
        element={
          <Suspense fallback={<div className="flex justify-center items-center min-h-screen">
            <p className="text-xl font-medium">Carregando...</p>
          </div>}>
            <LazyNotFound />
          </Suspense>
        }
      />
      <Route
        path="/services/:serviceId?"
        element={
          <Suspense fallback={<div className="flex justify-center items-center min-h-screen">
            <p className="text-xl font-medium">Carregando...</p>
          </div>}>
            <LazyServices />
          </Suspense>
        }
      />
      <Route
        path="/professionals"
        element={
          <Suspense fallback={<div className="flex justify-center items-center min-h-screen">
            <p className="text-xl font-medium">Carregando...</p>
          </div>}>
            <LazyProfessionals />
          </Suspense>
        }
      />
      <Route
        path="/bookTime"
        element={
          <Suspense fallback={<div className="flex justify-center items-center min-h-screen">
            <p className="text-xl font-medium">Carregando...</p>
          </div>}>
            <LazyBookTime />
          </Suspense>
        }
      />

    </Routes>
  );
};

export default AppRoutes;
