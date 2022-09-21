import { useState } from "react";
import "./Userprofile.css";
import { useSelector } from "react-redux";
import axios from "axios";

function Userprofile() {
  let { userObj } = useSelector((state) => state.userLogin);
  let [message, setMessage] = useState("");

  const getPrivateData = async () => {
    //get token from local storage
    let clientToken = localStorage.getItem("token");

    //making authenticated request
    let res = await axios.get("/user/private", {
      headers: { Authorization: clientToken },
    });

    setMessage(res.data.message);
  };



  return (
    <div className="container">
      <p className="display-5 text-end text-primary">
        Welcome, {userObj.username}
      </p>
      <button
        className="btn btn-warning d-block mx-auto"
        onClick={getPrivateData}
      >
        Get private data
      </button>
      <p className="display-2 text-info text-cen">{message}</p>
    </div>
  );
}

export default Userprofile;
