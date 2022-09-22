import * as React from "react";
import img from "../../assets/110.png";

function Footer() {
  return (
    <footer>
      {" "}
      <a
        href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=45032302000093"
        target="_blank"
        style={{
          display: "inline-block",
          textDecoration: "none",
          color: "#4e6e8e",
        }}
      >
        <img alt="" src={img} style={{ float: "left" }} />
        &nbsp;桂公网安备 45032302000093号
      </a>{" "}
      | Copyright © 2022-present{" "}
      <a className="perfectA" href="https://github.com/mosqu1t0">
        mosquito
      </a>
    </footer>
  );
}

export default Footer;
