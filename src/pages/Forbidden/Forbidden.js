import React from "react";
import classNames from "classnames/bind";
import styles from "./Forbidden.module.scss";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

const Forbidden = () => {
  const navigate = useNavigate();
  return (
    <div className={cx("wrapper")}>
      <div className={cx("background")}>
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Forbidden;
