import { Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import SignUp from "./Pages/Website/Auth/SignUp";
import LogIn from "./Pages/Website/Auth/LogIn";
import CreateUser from "./Pages/Dashboard/Users/CreateUser";
import Home from "./Pages/Website/Home";
import Users from "./Pages/Dashboard/Users/Users";
import EditUsers from "./Pages/Dashboard/Users/EditUsers";
import RequireAuth from "./Pages/Website/Auth/RequireAuth";
import PresistLogin from "./Pages/Website/Auth/PersistLogin";
import Products from "./Pages/Dashboard/Products/Products";
import NewProduct from "./Pages/Dashboard/Products/NewProduct";
import EditProduct from "./Pages/Dashboard/Products/EditProduct";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/LogIn" element={<LogIn />} />
        {/* protected routes */}
        <Route element={<PresistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="/Dashboard" element={<Dashboard />}> 
              <Route path="Users" element={<Users />} />
              <Route path="Users/:id" element={<EditUsers />} />
              <Route path="User/Create" element={<CreateUser />} />
              <Route path="products" element={<Products />} />
              <Route path="products/create" element={<NewProduct />} />
              <Route path="products/:id" element={<EditProduct />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}
