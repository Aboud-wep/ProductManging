import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { User } from "../../../Context/Context";
import LoadingScreen from "../../../Conmponants/Loading";
import Cookies from "universal-cookie";

export default function PresistLogin() {
  // Get current user
  const context = useContext(User);
  const token = context.auth.token;
  const [loading, setLoading] = useState(true);

  // Cookie
  const cookie = new Cookies();
  const getToken = cookie.get("Bearer");

  //send refresh token
  // useEffect(() => {
  //   async function Refresh() {
  //     try {
  //       await axios
  //         .post(`http://127.0.0.1:8000/api/refresh`, null, {
  //           headers: {
  //             Authorization: "Bearer " + getToken,
  //           },
  //         })
  //         .then((data) => {
  //           cookie.set("Bearer", data.data.token);
  //           context.setAuth((prev) => {
  //             return {
  //               details: data.data.user,
  //               token: data.data.token,
  //             };
  //           });
  //         });
  //     } catch (err) {
  //       console.log(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   !token ? Refresh() : setLoading(false);
  // }, []);
  useEffect(() => {
    async function Refresh() {
      try {
        const response = await axios.post(
          `http://127.0.0.1:8000/api/refresh`,
          null,
          {
            headers: {
              Authorization: "Bearer " + getToken,
            },
          }
        );

        const { data } = response;

        cookie.set("Bearer", data.token);
        context.setAuth((prev) => ({
          ...prev,
          details: data.user,
          token: data.token,
        }));
      } catch (error) {
        // Log the error for debugging
        console.error("Error refreshing token:", error);

        // Handle specific error cases if needed
        if (error.response && error.response.status === 401) {
          // Handle unauthorized error (e.g., redirect to login page)
        } else {
          // Handle other types of errors
        }
      } finally {
        setLoading(false);
      }
    }

    // Refresh token if not available
    if (!token) {
      Refresh();
    } else {
      setLoading(false);
    }
  }, []);

  return loading ? <LoadingScreen /> : <Outlet />;
}
