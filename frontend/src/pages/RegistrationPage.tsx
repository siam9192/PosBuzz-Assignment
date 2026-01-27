import { Col, Row, Typography, Form, Input, Button, Checkbox, message } from "antd";
import { useState } from "react";

function RegistrationPage() {
  const [loading, setLoading] = useState(false);

  const onFinish = (values: any) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      message.success("Registration Successful!");
      console.log("Form Values:", values);
    }, 1500);
  };

  return (
    <div className="registration-page" style={{ padding: "50px" }}>
      <Row gutter={50} justify="center" align="middle">
        {/* Image Column */}
        <Col xs={24} md={12}>
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/003/689/228/small/online-registration-or-sign-up-login-for-account-on-smartphone-app-user-interface-with-secure-password-mobile-application-for-ui-web-banner-access-cartoon-people-illustration-vector.jpg"
            alt="Registration"
            style={{ width: "100%", borderRadius: "10px" }}
          />
        </Col>

        {/* Form Column */}
        <Col xs={24} md={12}>
          <div style={{ maxWidth: "400px", margin: "0 auto" }}>
            <Typography.Title level={2} >Register Now</Typography.Title>

            <Form
              layout="vertical"
              onFinish={onFinish}
              initialValues={{ remember: true }}
            >
              <Form.Item
                label="Full Name"
                name="fullName"
                rules={[
                  { required: true, message: "Please enter your full name" },
                ]}
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
                        : Promise.reject(
                            new Error("You must agree to the terms and conditions")
                          ),
                  },
                ]}
              >
                <Checkbox>I agree to the terms and conditions</Checkbox>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  block
                >
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
