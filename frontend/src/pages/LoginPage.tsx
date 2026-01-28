import { useMutation } from "@tanstack/react-query";
import { Col, Row, Typography, Form, Input, Button, App } from "antd";
import { useNavigate } from "react-router-dom";
import { login } from "../api-services/auth.api";
import { queryClient } from "../providers/Provider";

function LoginPage() {
  const navigate = useNavigate();
  const { message } = App.useApp();

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess(data) {
      message.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["me"] });
      setTimeout(() => {
        navigate("/");
      }, 1000);
    },
    onError(err) {
      message.error(err.message);
    },
  });

  return (
    <div className="login-page" style={{ padding: "50px" }}>
      <Row gutter={50} justify="center" align="middle">
        {/* Image Column */}
        <Col xs={24} md={12}>
          <img
            src="https://static.vecteezy.com/system/resources/previews/001/991/652/non_2x/sign-in-page-flat-design-concept-illustration-icon-account-login-user-login-abstract-metaphor-can-use-for-landing-page-mobile-app-ui-posters-banners-free-vector.jpg"
            alt="Registration"
            style={{ width: "100%", borderRadius: "10px" }}
          />
        </Col>

        {/* Form Column */}
        <Col xs={24} md={12}>
          <div style={{ maxWidth: "400px", margin: "0 auto" }}>
            <Typography.Title level={2}>Login Now</Typography.Title>

            <Form layout="vertical" onFinish={mutate} initialValues={{ remember: true }}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please enter your email" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input placeholder="example@email.com" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Please enter your password" }]}
              >
                <Input.Password placeholder="Enter password" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={isPending} block>
                  Login
                </Button>
              </Form.Item>
            </Form>

            <Typography.Text>
              Don't have an account? <a href="/register">Register here</a>
            </Typography.Text>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default LoginPage;
