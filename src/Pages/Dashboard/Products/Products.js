import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../../../Context/Context";
export default function Products() {
  const [products, setProducts] = useState([]);
  const [run, setRun] = useState(0);

  const context = useContext(User);
  const token = context.auth.token;

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/product/show", {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((data) => {
        setProducts(data.data);
      })
      .catch((err) => console.log(err));
  }, [run]);

  async function deleteUser(id) {
    try {
      const res = await axios.delete(
        `http://127.0.0.1:8000/api/product/delete/${id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (res.status === 200) {
        setRun((prev) => prev + 1);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const ShowProducts = products.map((product, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{product.title}</td>
      <td>{product.description}</td>
      <td>
        <Link to={`${product.id}`}>
          <i
            className="fa-solid fa-pen-to-square"
            style={{ fontSize: "20px", marginRight: "16px", cursor: "pointer" }}
          />
        </Link>
        <i
          onClick={() => deleteUser(product.id)}
          className="fa-solid fa-trash"
          style={{ fontSize: "20px", color: "red", cursor: "pointer" }}
        />
      </td>
    </tr>
  ));

  return (
    <div className="container mt-3">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{ShowProducts}</tbody>
      </table>
    </div>
  );
}
