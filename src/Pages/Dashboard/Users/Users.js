import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../../../Context/Context";
export default function Users() {
  const [Users, setUsers] = useState([]);
  const [run, setRun] = useState(0);

  const context = useContext(User);
  const token = context.auth.token;

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/user/show", {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((data) => {
        setUsers(data.data);
      })
      .catch((err) => console.log(err));
  }, [run]);

  async function deleteUser(id) {
    try {
      const res = await axios.delete(
        `http://127.0.0.1:8000/api/user/delete/${id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (res.status === 200) {
        setRun((prev) => prev + 1);
      }
    } catch {
      console.log("none");
    }
  }

  const ShowUsers = Users.map((user, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>
        <Link to={`${user.id}`}>
          <i
            className="fa-solid fa-pen-to-square"
            style={{ fontSize: "20px", marginRight: "16px", cursor: "pointer" }}
          />
        </Link>
        <i
          onClick={() => deleteUser(user.id)}
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
            <th>User</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{ShowUsers}</tbody>
      </table>
    </div>
  );
}
