import { Typography, Button,Grid, Flex, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Container from "./Container";
import { useCurrentUser } from "../lib/useCurrentUser";
import type { User } from "../types/user.type";
import { IoIosLogOut } from "react-icons/io";
import Cookies from "js-cookie";

const { useBreakpoint } = Grid;

function Header() {
  const screens = useBreakpoint(); 
  
  const userHook = useCurrentUser()
  const user = userHook.user as User
   
  function logout () {
    Cookies.remove("accessToken",{path:"/",domain:"localhost"})
    Cookies.remove("refreshToken",{path:"/",domain:"localhost"})
    userHook.setUser(null)
  }

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
              fontSize: screens.xs ? "28px" : "32px"
            }}
          >
            PossBuzz
          </Typography.Title>
       <Flex align="center" gap={20}>
         <Flex align="center" gap={5}>
          <Avatar style={{ backgroundColor: '#87d068' }} size="large" icon={<UserOutlined />} />
          <Typography.Text strong >{user.name}</Typography.Text>
         </Flex>
          <Button onClick={logout}  size="large"  type="dashed" danger >
               <IoIosLogOut size={24} />
          </Button>

       </Flex>
        </div>
      </Container>
    </header>
  );
}

export default Header;
