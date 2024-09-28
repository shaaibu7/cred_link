
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";
// import Lender from "./Components/Lender";
import Root from "./Root";
import BorrowersPage from "./pages/BorrowersPage";

import LenderDashboard from "./pages/LenderDashboard";


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
    
      <Route path="/" element={<Root/>}>
        <Route index element={<Home/>}/>
        <Route path="LenderDAshboard" element={<LenderDashboard/>}/>
        <Route index element={<Home/>}/>
        <Route path="/lenderDashboard" element={<LenderDashboard />} />
        <Route path="/borrowersDashboard" element={<BorrowersPage/>}/>
      </Route>

    )
  )
  return (
    < div className="">
      <RouterProvider router={router}/>
    
    </div>
  );
}

export default App;
