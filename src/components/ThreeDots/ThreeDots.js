import React from "react";
import className from "classnames/bind";
import styles from "./ThreeDots.module.scss";

const cx = className.bind(styles);

const ThreeDots = () => {
  return (
    <div className={cx("three-dots", "dot")}>
      <div className={cx("dot-one", "dot")}></div>
      <div className={cx("dot-two", "dot")}></div>
      <div className={cx("dot-three", "dot")}></div>
    </div>
  );
};

export default ThreeDots;
