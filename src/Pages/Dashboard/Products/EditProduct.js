import axios from "axios";
import { useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { User } from "../../../Context/Context";

export default function EditProduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const id = window.location.pathname.split("/").slice(-1)[0];
  const [accept, setAccept] = useState(false);

  const context = useContext(User);
  const token = context.auth.token;

  const nav = useNavigate();

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/product/showbyid/${id}`, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((data) => {
        console.log(data);
        setTitle(data.data[0].title);
        setDescription(data.data[0].description);
      })
      .catch((err) => console.log(err));
  }, []);

  async function submit(e) {
    e.preventDefault();
    setAccept(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("image", image);

      let res = await axios.post(
        `http://127.0.0.1:8000/api/product/update/${id}`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      nav("/dashboard/products");
    } catch (err) {
      console.log(err);
      setAccept(true);
    }
  }
  return (
    <div>
      <div className="child">
        <form onSubmit={submit}>
          <label htmlFor="name">Title:</label>
          <input
            type="text"
            id="name"
            placeholder="Enter The Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {title.length < 1 && accept && (
            <p className="error">Title name is required</p>
          )}
          <label htmlFor="email">description:</label>
          <input
            type="text"
            id="email"
            placeholder="Enter The Description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {/* {accept && emailerror && <p className="error">Email is taken</p>}*/}

          <label htmlFor="password">Image:</label>
          <input
            type="file"
            id="password"
            placeholder="Enter Your Password"
            onChange={(e) => setImage(e.target.files.item(0))}
          />

          {/* {password.length < 8 && accept && <p className="error">watch out</p>} */}

          <div style={{ textAlign: "center" }}>
            <button type="supmit">Update Product</button>
          </div>
        </form>
      </div>
    </div>
  );
}
