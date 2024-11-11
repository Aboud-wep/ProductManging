import { NavLink } from "react-router-dom";

export default function DashboardSidbar() {
  return (
    <div>
      <div className="sidebar">
        <NavLink
          activeclassname="active"
          className="sidebara"
          to="/Dashboard/Users"
        >
          <i className="fa-solid fa-users"></i> Users
        </NavLink>
        <NavLink
          activeclassname="active"
          className="sidebara"
          to="/Dashboard/User/Create"
        >
          <i className="fa-solid fa-user-plus"></i> New User
        </NavLink>
        <NavLink
          activeclassname="active"
          className="sidebara"
          to="/Dashboard/products"
        >
          <i className="fa fa-brands fa-product-hunt"></i> Products
        </NavLink>
        <NavLink
          activeclassname="active"
          className="sidebara"
          to="/Dashboard/products/Create"
        >
          <i className="fa-solid fa-plus"></i> New Product
        </NavLink>
      </div>
    </div>
  );
}
