import axios from "axios";
import { useContext, useState } from "react";
import { User } from "../../../Context/Context";
import Header from "../../../Conmponants/Header";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [Cpassword, setCpassword] = useState("");
  const [accept, setAccept] = useState(false);
  const [emailerror, setEmailerror] = useState(false);

  // const UserNow = useContext(User);
  // console.log(UserNow);
  // useEffect(() => {
  //   setName(props.name);
  //   setEmail(props.email);
  // }, [props.name, props.email]);
  const nav = useNavigate();
  const cookie = new Cookies();

  const user = useContext(User);
  console.log(user);
  async function submit(e) {
    e.preventDefault();
    setAccept(true);

    try {
      let res = await axios.post("http://127.0.0.1:8000/api/register", {
        name: name,
        email: email,
        password: password,
        password_confirmation: Cpassword,
      });
      const token = res.data.data.token;
      cookie.set("Bearer", token);
      const details = res.data.data.user;
      user.setAuth({ token, details });
      nav("/dashboard");
    } catch (err) {
      if (err.response.status === 422) {
        setEmailerror(true);
      }
      setAccept(true);
    }
  }
  return (
    <div>
      <Header />
      <div className="child">
        <form onSubmit={submit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {name.length < 2 && accept && (
            <p className="error">user name is required</p>
          )}
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Enter Your Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {accept && emailerror && <p className="error">Email is taken</p>}
          <label htmlFor="password">Password:</label>

          <input
            type="password"
            id="password"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />

          {password.length < 8 && accept && <p className="error">watch out</p>}

          <label htmlFor="Cpassword">Confirm Password:</label>
          <input
            type="password"
            id="Cpassword"
            placeholder="Confirm Your Password"
            value={Cpassword}
            onChange={(e) => setCpassword(e.target.value)}
          />
          {Cpassword !== password && accept && (
            <p className="error">yl3n Messi</p>
          )}
          <div style={{ textAlign: "center" }}>
            <button type="supmit">SignUp</button>
          </div>
        </form>
      </div>
    </div>
  );
}
