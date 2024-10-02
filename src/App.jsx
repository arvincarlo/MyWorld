import { BrowserRouter, Routes, Route } from "react-router-dom"
import Product from './pages/Product';
import Pricing from './pages/Pricing';
import Homepage from './pages/Homepage';
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />}></Route>
          <Route path="product" element={<Product />}></Route>
          <Route path="pricing" element={<Pricing />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="app" element={<AppLayout />}>
            <Route index element={<p>List of Cities </p>}></Route>
            <Route path="cities" element={<p>List of Cities</p>}></Route>
            <Route path="countries" element={<p>List of Countries</p>}></Route>
            <Route path="form" element={<p>Form</p>}></Route>
          </Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
