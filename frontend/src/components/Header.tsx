import { Typography, Button, Menu, Dropdown, Grid, Flex, Avatar } from "antd";
import { MenuOutlined, UserOutlined } from "@ant-design/icons";
import Container from "./Container";

import { Link } from "react-router-dom";

const { useBreakpoint } = Grid;

function Header() {
  const screens = useBreakpoint(); 

  const menuItems = [
    { label: <Link to="/">Home</Link>, key: "home" },
    { label: <Link to="/register">Register</Link>, key: "register" },
    { label: <Link to="/login">Login</Link>, key: "login" },
    { label: <Link to="/about">About</Link>, key: "about" },
  ];

  return (
    <header
      style={{
        padding: "10px 0",
        borderBottom: "1px solid #f0f0f0",
        backgroundColor: "#fff",
      }}
    >
      <Container>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Typography.Title
            level={2}
            style={{
              margin: 0,
              color: "#1890ff",
              fontSize: screens.xs ? "28px" : "32px", // responsive font size
            }}
          >
            PossBuzz
          </Typography.Title>
       <Flex align="center" gap={20}>
         <Flex align="center" gap={5}>
          <Avatar style={{ backgroundColor: '#87d068' }} size="large" icon={<UserOutlined />} />
          <Typography.Text strong>Siam Hasan...</Typography.Text>
         </Flex>
          {/* <Button type="primary" size="middle" danger>
                Logout
          </Button> */}

       </Flex>
        </div>
      </Container>
    </header>
  );
}

export default Header;
