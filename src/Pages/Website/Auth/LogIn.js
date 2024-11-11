import axios from "axios";
import { useContext, useState } from "react";
import { User } from "../../../Context/Context";
import Header from "../../../Conmponants/Header";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  const [accept, setAccept] = useState(false);
  const [err, setErr] = useState(false);

  const nav = useNavigate();

  const cookie = new Cookies();

  const user = useContext(User);
  console.log(user);
  async function submit(e) {
    e.preventDefault();
    setAccept(true);

    try {
      let res = await axios.post("http://127.0.0.1:8000/api/login", {
        email: email,
        password: password,
      });
      const token = res.data.data.token;
      cookie.set("Bearer", token);
      const details = res.data.data.user;
      user.setAuth({ token, details });
      nav("/dashboard");
    } catch (err) {
      if (err.response.status === 401) {
        setErr(true);
      }
      setAccept(true);
    }
  }
  return (
    <div>
      <Header />
      <div className="child">
        <form onSubmit={submit}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Enter Your Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password:</label>

          <input
            type="password"
            id="password"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />

          {password.length < 8 && accept && <p className="error">watch out</p>}

          <div style={{ textAlign: "center" }}>
            <button type="supmit">LogIn</button>
          </div>
          {accept && err && <p className="error">Email is taken</p>}
        </form>
      </div>
    </div>
  );
}
