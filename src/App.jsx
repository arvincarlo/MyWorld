import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";

import CityList from './components/CityList';
import CountryList from './components/CountryList';
import City from './components/City';
import Form from './components/Form';
import SpinnerFullPage from './components/SpinnerFullPage';

// import Product from './pages/Product';
// import Pricing from './pages/Pricing';
// import Homepage from './pages/Homepage';
// import PageNotFound from "./pages/PageNotFound";
// import AppLayout from "./pages/AppLayout";
// import Login from "./pages/Login";

const Product = lazy(() => import('./pages/Product'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Homepage = lazy(() => import('./pages/Homepage'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));
const AppLayout = lazy(() => import('./pages/AppLayout'));
const Login = lazy(() => import('./pages/Login'));

// dist/assets/index-3e2a41c3.css   44.86 kB │ gzip:   7.50 kB
// dist/assets/index-8d3aeac6.js   523.39 kB │ gzip: 154.66 kB


function App() {
  
  return (
    <div>
      <AuthProvider>
        <CitiesProvider>
          <BrowserRouter>
            <Suspense fallback={<SpinnerFullPage></SpinnerFullPage>}>
              <Routes>
                <Route index element={<Homepage />}></Route>
                <Route path="product" element={<Product />}></Route>
                <Route path="pricing" element={<Pricing />}></Route>
                <Route path="login" element={<Login />}></Route>
                <Route path="app" element={
                  <ProtectedRoute>
                    <AppLayout/>
                  </ProtectedRoute>}>
                  <Route index element={<Navigate replace to="cities"/>}></Route>
                  <Route path="cities" element={<CityList/>}></Route>
                  <Route path="cities/:id" element={<City/>}></Route>
                  <Route path="countries" element={<CountryList/>}></Route>
                  <Route path="form" element={<Form></Form>}></Route>
                </Route>
                <Route path="*" element={<PageNotFound />}></Route>
              </Routes>
            </Suspense>
          </BrowserRouter>
        </CitiesProvider>
      </AuthProvider>
    </div>
  )
}

export default App
