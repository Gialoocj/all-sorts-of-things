import React, { useState, useEffect, useRef } from "react";
import styles from "./MainLayout.module.scss";
import classNames from "classnames/bind";
import Navigation from "../components/Navigation";

const cx = classNames.bind(styles);

const MainLayout = ({ children }) => {
  const navRef = useRef();
  const [isOpenNav, setIsOpenNav] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const handleOpenNav = () => {
    setIsOpenNav(!isOpenNav);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsOpenNav(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={cx("wrapper")}>
      <div
        className={cx("navigation", { "navigation-mobile": !isMobile })}
        ref={navRef}
      >
        <Navigation
          handleOpenNav={handleOpenNav}
          isMobile={isMobile}
          isOpenNav={isOpenNav}
        />
      </div>
      <div className={cx("content")}>{children}</div>
    </div>
  );
};

export default MainLayout;
