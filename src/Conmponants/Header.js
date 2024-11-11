import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
export default function Header() {
  const cookie = new Cookies();
  const token = cookie.get("Bearer");

  async function handleLogout() {
    await axios.post("http://127.0.0.1:8000/api/logout", null, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    cookie.remove("Bearer");
    window.location.pathname = "/Home";
  }
  return (
    <nav>
      <div>
        <ul>
          <li>
            <Link to="/Home" className="Link">
              Home
            </Link>
          </li>

          <div style={{ float: "right" }}>
            {!token ? (
              <>
                <li>
                  <Link to="/SignUp" className="Link">
                    SignUp
                  </Link>
                </li>
                <li>
                  <Link to="/LogIn" className="Link">
                    LogIn
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/dashboard" className="Link">
                    Dashboard
                  </Link> 
                </li>
                <div
                  className="Link"
                  style={{ float: "left", cursor: "pointer" }}
                  onClick={handleLogout}
                >
                  LogOut
                </div>
              </>
            )}
          </div>

          <li style={{ float: "right" }}></li>
        </ul>
      </div>
    </nav>
  );
}
