import React from "react";
import styles from "./DefaultLayout.module.scss";
import Navigation from "../components/Navigation/Navigation";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const DefaultLayout = ({ children }) => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("nav")}>
        <Navigation />
      </div>
      {/* <div className={cx("content")}>{children}</div> */}
    </div>
  );
};

export default DefaultLayout;
