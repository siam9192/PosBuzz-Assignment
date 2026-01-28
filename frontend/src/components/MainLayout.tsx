import Container from "./Container";
import { Outlet } from "react-router-dom";
import Header from "./Header";

function MainLayout() {
  return (
    <div>
      <Header />
      <Container>
        <div style={{ padding: "20px 0" }}>
          <Outlet />
        </div>
      </Container>
    </div>
  );
}

export default MainLayout;
