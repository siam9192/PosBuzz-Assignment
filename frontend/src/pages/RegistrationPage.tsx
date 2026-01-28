import { useMutation } from "@tanstack/react-query";
import { Col, Row, Typography, Form, Input, Button, Checkbox, App } from "antd";
import { register } from "../api-services/auth.api";
import { useNavigate } from "react-router-dom";

function RegistrationPage() {
  const navigate = useNavigate();
  const { message } = App.useApp();

  const { mutate, isPending } = useMutation({
    mutationFn: register,
    onSuccess(data) {
      message.success(data.message);
      navigate("/login");
    },
    onError(err) {
      message.error(err.message);
    },
  });

  return (
    <div className="registration-page" style={{ padding: "50px" }}>
      <Row gutter={50} justify="center" align="middle">
        {/* Image Column */}
        <Col xs={24} md={12}>
          <img
            src="https://thumbs.dreamstime.com/b/sign-page-abstract-concept-vector-illustration-enter-application-mobile-screen-user-login-form-website-interface-ui-new-profile-203016094.jpg"
            alt="Registration"
            style={{ width: "100%", borderRadius: "10px" }}
          />
        </Col>

        {/* Form Column */}
        <Col xs={24} md={12}>
          <div style={{ maxWidth: "400px", margin: "0 auto" }}>
            <Typography.Title level={2} className="title">
              Register Now
            </Typography.Title>

            <Form layout="vertical" onFinish={mutate} initialValues={{ remember: true }}>
              <Form.Item
                label="Full Name"
                name="name"
                rules={[{ required: true, max: 30, message: "Please enter your full name" }]}
              >
                <Input placeholder="John Doe" />
              </Form.Item>

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
                rules={[
                  { required: true, message: "Please enter your password" },
                  { min: 6, message: "Password must be at least 6 characters" },
                ]}
              >
                <Input.Password placeholder="Enter password" />
              </Form.Item>

              <Form.Item
                name="agree"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value
                        ? Promise.resolve()
                        : Promise.reject(new Error("You must agree to the terms and conditions")),
                  },
                ]}
              >
                <Checkbox>I agree to the terms and conditions</Checkbox>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={isPending} block>
                  Register
                </Button>
              </Form.Item>
            </Form>

            <Typography.Text>
              Already have an account? <a href="/login">Login here</a>
            </Typography.Text>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default RegistrationPage;
