import * as logoutImage from "../assets/logout.png";
import * as Image from "../assets/laxbw-prime-1715-hor-wide.webp";
import Logo from "../components/Logo.js";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
const instance = (token) =>
  axios.create({
    baseURL: "http://api.localhost/v1/",
    timeout: 1000,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
// var hasRun = false;
// function justOnce() {
//   if (hasRun) {
//     return;
//   }
//   alert("runn");
//   hasRun = true;

//   var token = localStorage.getItem("token");

//   instance(token)({
//     method: "GET",
//     url: "/search?query=",
//   })
//     .then(function (response) {
//       return response.data;
//     })
//     .catch((e) => {
//       console.log(e);
//       return [];
//     });
// }
function logout() {
  localStorage.removeItem("token");
  window.location = "/login";
}
export default function DashboardPage() {
  const [state, setState] = useState([]);

  useEffect(() => {
    var token = localStorage.getItem("token");

    instance(token)({
      method: "GET",
      url: "/search?query=",
    })
      .then(function (response) {
        console.log(response.data);
        var index = 0;
        var items = [];
        response.data.forEach((element) => {
          index++;
          items.push(
            <div key={index} className="restaurant">
              <img src={Image.default} alt="" />
              <h2>{element.name}</h2>
              <p>{element.description}</p>
              <button className="simple-button">{"View restaurant >>"}</button>
            </div>
          );
        });
        setState(items);
      })
      .catch((e) => {
        alert("no");
      });
    return () => {};
  }, [setState]);

  return (
    <div className="p-1">
      <div className="row space-between">
        <Logo></Logo>
        <button className="action-button" onClick={logout}>
          <img src={logoutImage.default} />
          Log out
        </button>
      </div>
      <div className="container">{state}</div>
    </div>
  );
}
