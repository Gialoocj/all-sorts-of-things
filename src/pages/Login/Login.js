import React, { useEffect, useState } from "react";
import styles from "./Login.module.scss";
import className from "classnames/bind";
import { Link } from "react-router-dom";
import { EmailIcon, LockIcon, UnlockIcon } from "../../components/icons/icons";
import { useDispatch } from "react-redux";
import { login, register } from "../../apiService/authService";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const cx = className.bind(styles);

const Login = () => {
  const dispatch = useDispatch();
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    localStorage.setItem("lang", "en");
    setLoading(true);
    dispatch(login(loginForm)).then((result) => {
      if (result.payload.code !== 200) {
        return toast.error(result.payload.message);
      }
      toast.success(result.payload.message);
      Cookies.set("accessToken", result.payload.accessToken);
      Cookies.set("refreshToken", result.payload.refreshToken);
      setLoading(false);
      setTimeout(() => {
        window.location.href = "/watch";
      }, 1500);
    });
  };

  useEffect(() => {
    const check = localStorage.getItem("check");
    if (check === "true") {
      toast.success("Log out successfully");
      setTimeout(() => {
        localStorage.removeItem("check");
      }, 1000);
    }
  }, []);

  return (
    <div className={cx("wrapper")}>
      <form className={cx("register-form-wrapper")}>
        {/* <div className={cx("register-form-background")}></div> */}
        <div className={cx("register-form")}>
          <h1>Login</h1>

          <div className={cx("form-group")}>
            <label>Email</label>
            <div className={cx("input-group")}>
              <input
                type="text"
                className={cx("inp-email")}
                name="email"
                onChange={(e) => {
                  handleInputChange(e);
                }}
              />
              <div className={cx("icon-wrapper")}>
                <EmailIcon className={cx("icon")} />
              </div>
            </div>
          </div>
          <div className={cx("form-group")}>
            <label>Password</label>
            <div className={cx("input-group")}>
              <input
                type={isShowPassword ? "text" : "password"}
                className={cx("inp-password")}
                name="password"
                onChange={(e) => {
                  handleInputChange(e);
                }}
              />
              <div className={cx("icon-wrapper")}>
                {isShowPassword ? (
                  <UnlockIcon className={cx("icon")} />
                ) : (
                  <LockIcon className={cx("icon")} />
                )}
              </div>
            </div>
          </div>

          <div className={cx("checkbox-group")}>
            <input type="checkbox" onClick={handleShowPassword} />
            <span>Show password</span>
          </div>

          <button
            className={cx("btn-register", { "btn-register-loading": loading })}
            onClick={(e) => {
              handleRegister(e);
            }}
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>
          <p>
            Don't have an account? <Link to="/register">Register</Link> here
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
