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
            <a href="/about-us">About Us</a>
          </li>

          <li>
            <a href="/faq">FAQs</a>
          </li>
          <li>
            <a href="/order-tracking">Order Tracking</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
          <li>
            <a target="_blank" href="https://ssaurabh.com/">
              &#169; by Saurabh
            </a>
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
