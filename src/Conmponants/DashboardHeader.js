import { Link } from "react-router-dom";

export default function DashboardHeader() {
  return (
    <nav>
      <div>
        <ul>
          <li>
            <div style={{ fontSize: "28px" }}>Store</div>
          </li>
          <li style={{ float: "right" }}>
            <Link to="/Home" className="Link">
              Go To Main Page
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
