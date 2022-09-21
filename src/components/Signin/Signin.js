import { useEffect } from "react";
import "./Signin.css";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { userLoginLifeCycle } from "../../store/userLoginSlice";
import { useNavigate } from "react-router-dom";

function Signin() {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let { userObj, isSuccess, isError, errMessage } = useSelector(
    (state) => state.userLogin
  );
  let dispatch = useDispatch();
  let navigate = useNavigate();

  let formSumbit = (userCredObj) => {
    let actionObj = userLoginLifeCycle(userCredObj);
    dispatch(actionObj);
  };

  useEffect(() => {
    console.log("use effect");
    if (isSuccess) {
      navigate(`/userprofile/${userObj.username}`);
    }
  }, [isSuccess, isError]);

  return (
    <div className="row">
      <div className="col-11 col-sm-8 col-md-6 mx-auto">
        <p className="display-3 text-center text-secondary">User Login</p>

        {/* invalid credentials */}
        {isError === true && (
          <p className="alert alert-danger fw-bold text-center">{errMessage}</p>
        )}
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

          <button className="btn btn-outline-success" type="onSubmit">
            Signin
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signin;
