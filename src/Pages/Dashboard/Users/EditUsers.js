import { useState, useEffect, useContext } from "react";
import SignUp from "../../Website/Auth/SignUp";
import { User } from "../../../Context/Context";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditUsers() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [Cpassword, setCpassword] = useState("");
  const [accept, setAccept] = useState(false);
  const [emailerror, setEmailerror] = useState(false);

  const context = useContext(User);
  const token = context.auth.token;
  const nav = useNavigate();

  const id = window.location.pathname.split("/").slice(-1)[0];
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/user/showbyid/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setName(data[0].name);
        setEmail(data[0].email);
      });
  }, []);

  async function submit(e) {
    e.preventDefault();
    setAccept(true);

    try {
      let res = await axios.post(
        `http://127.0.0.1:8000/api/user/update${id}`,
        {
          name: name,
          email: email,
          password: password,
          password_confirmation: Cpassword,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      nav("/dashboard/users");
    } catch (err) {
      if (err.response.status === 422) {
        setEmailerror(true);
      }
      setAccept(true);
    }
  }

  return (
    <div>
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
            <button type="supmit">Edit User</button>
          </div>
        </form>
      </div>
    </div>
  );
}
