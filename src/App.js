import { NavLink, Routes, Route } from "react-router-dom";
import "./App.css";
import {
  Home,
  Signin,
  Signup,
  Aboutus,
  Nomatch,
  Userprofile,
} from "./components/Allcomponents";

import { useSelector, useDispatch } from "react-redux";
import { clearState } from "./store/userLoginSlice";

function App() {
  let { isSuccess } = useSelector((state) => state.userLogin);
  let dispatch = useDispatch();


  //user logout
  const userLogout = () => {
    //remove token from localstorage
    localStorage.removeItem("token");
    //reset the user slice
    let actionObj=clearState()
    dispatch(actionObj)

  };

  return (
    <div>
      {/* navbar */}
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark main-navbar">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {isSuccess === true ? (
                <li className="nav-item" onClick={userLogout}>
                  <NavLink className="nav-link" to="/signin">
                    Signout
                  </NavLink>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/">
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/signup">
                      Signup
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/signin">
                      Signin
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink className="nav-link" to="/aboutus">
                      Aboutus
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
      {/* configure routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/userprofile/:username" element={<Userprofile />} />
        <Route path="*" element={<Nomatch />} />
      </Routes>
    </div>
  );
}

export default App;
