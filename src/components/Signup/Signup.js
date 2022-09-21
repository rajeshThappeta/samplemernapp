import { useState } from "react";
import "./Signup.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  let [errMsg, setErrMsg] = useState("");

  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let navigate = useNavigate();

  let formSumbit = async (userObj) => {
    //http post req
    let res = await axios.post(
      "http://localhost:4000/user/create-user",
      userObj
    );

    if (res.data.message === "User created") {
      //navigate tp login
      navigate("/signin");
    } else {
      setErrMsg(res.data.message);
    }
  };

  return (
    <div className="row">
      <div className="col-11 col-sm-8 col-md-6 mx-auto">
        <p className="display-3 text-center text-secondary">
          User Registration
        </p>
        {/* Duplicate user message */}
        {errMsg !== "" && <p className="text-danger fw-bold">{errMsg}</p>}
        <form onSubmit={handleSubmit(formSumbit)}>
          {/* username */}
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="form-control"
              {...register("username")}
            />
          </div>

          {/* password */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              {...register("password")}
            />
          </div>
          {/* email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              {...register("email")}
            />
          </div>

          {/* date of borth */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Date of birth
            </label>
            <input
              type="date"
              id="dob"
              className="form-control"
              {...register("dob")}
            />
          </div>

          <button className="btn btn-outline-success" type="onSubmit">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
