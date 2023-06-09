import { Menu } from "antd";
import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

const items = [
  {
    label: "Users",
    key: "users",
  },
  {
    label: "Projects",
    key: "projects",
  },
  {
    label: "Connections",
    key: "connections",
  },
  {
    label: "Datasets",
    key: "datasets",
  },
  {
    label: "Profiling",
    key: "profiling",
  },
  {
    label: "Validation",
    key: "validation",
  }
];

const Navigation = () => {
  const [current, setCurrent] = useState("users");
  const navigate = useNavigate();

  const onClick = (e) => {
    console.log("Navigation clicked on:", e);
    setCurrent(e.key);
    switch (e.key) {
      case "users":
        navigate("users");
        break;
      case "projects":
        navigate("projects");
        break;
      case "connections":
        navigate("connections");
        break;
      case "datasets":
        navigate("datasets");
        break;
      case "profiling":
        navigate("profiling");
        break;
      case "validation":
        navigate("validate");
        break;
      default:
        navigate("/");
    }
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
      theme="dark"
      triggerSubMenuAction="hover"
    />
  );
};

export default Navigation;
