import React, { FC, CSSProperties } from "react";
import { Layout } from "antd";
import { Link } from "react-router-dom";

import icon from "../../../assets/icon.png";

const Component: FC = () => {
  const { Footer } = Layout;

  const style: CSSProperties = {
    backgroundColor: "#FFFFFE",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "5px 5px 0",
  };

  return (
    <Footer style={style}>
      <Link to="/">
        <img src={icon} alt="logo" width="32" height="32" />
      </Link>
      <span
        dangerouslySetInnerHTML={{
          __html: "&copy; 2023 - Copyright ECCcomp プログラミング研究部.",
        }}
      />
    </Footer>
  );
};

export default Component;
