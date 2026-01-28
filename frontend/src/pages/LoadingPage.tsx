import { Spin } from "antd";

function LoadingPage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <Spin size="large"></Spin>
    </div>
  );
}

export default LoadingPage;
