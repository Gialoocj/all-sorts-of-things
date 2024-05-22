import React, { useState } from "react";
import styles from "./Register.module.scss";
import className from "classnames/bind";
import { Link, useNavigate } from "react-router-dom";
import {
  EmailIcon,
  LockIcon,
  UnlockIcon,
  UserIcon,
} from "../../components/icons/icons";
import { useDispatch } from "react-redux";
import { register } from "../../apiService/authService";
import { toast } from "react-toastify";

const cx = className.bind(styles);

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registerForm, setRegisterForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleInputChange = (e) => {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(register(registerForm)).then((result) => {
      if (result.payload.code !== 201) {
        return toast.error(result.payload.message);
      }
      toast.success(result.payload.message);
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    });
  };
  return (
    <div className={cx("wrapper")}>
      <form className={cx("register-form-wrapper")}>
        {/* <div className={cx("register-form-background")}></div> */}
        <div className={cx("register-form")}>
          <h1>Register</h1>
          <div className={cx("form-group")}>
            <label>Username</label>
            <div className={cx("input-group")}>
              <input
                type="text"
                className={cx("inp-username")}
                name="username"
                onChange={(e) => {
                  handleInputChange(e);
                }}
              />
              <div className={cx("icon-wrapper")}>
                <UserIcon className={cx("icon")} />
              </div>
            </div>
          </div>
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
            className={cx("btn-register")}
            onClick={(e) => {
              handleRegister(e);
            }}
          >
            Register
          </button>
          <p>
            Already have an account? <Link to="/">Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
