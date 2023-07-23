import React from "react";
import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={classes.container}>
      <div className={classes.containerWrapper}>
        <ul className={`${classes.footerList} ${classes.links}`}>
          <li>
            <a href="#">About Us</a>
          </li>
          <li>
            <a href="#">Blog</a>
          </li>
          <li>
            <a href="#">FAQs</a>
          </li>
          <li>
            <a href="#">Order Tracking</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
          <li>
            <a href="#">&#169; by Saurabh</a>
          </li>
        </ul>
        <ul className={`${classes.footerList} ${classes.icons}`}>
          <li>
            <i className="pi pi-facebook"></i>
          </li>
          <li>
            <i className="pi pi-instagram"></i>
          </li>
          <li>
            <i className="pi pi-twitter"></i>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
