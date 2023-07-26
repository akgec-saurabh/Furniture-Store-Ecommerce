import React from "react";
// import "./Footer.scss";
import {
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
} from "@ant-design/icons";

const Footer = () => {
  return (
    <div className="footer_container">
      <div className="footer_container_wrapper">
        <ul className="footerList links">
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
        <ul className="footerList icons">
          <li>
            <FacebookOutlined />
          </li>
          <li>
            <InstagramOutlined />
          </li>
          <li>
            <TwitterOutlined />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
