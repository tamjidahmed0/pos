import { Button, Card, Form, Input, Typography, message } from "antd";
// import { api } from "../api/axios";

const { Title } = Typography;

export default function Login() {
  const onFinish = async () => {
    try {
      // const res = await api.post("/auth/login", values);
      // localStorage.setItem("token", res.data.access_token);
      // message.success("Login Successful");
      // window.location.href = "/products";
    } catch (err: any) {
      message.error(err?.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #4e54c8, #8f94fb)",
      }}
    >
      <Card
        style={{ width: 400, borderRadius: 12, boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
      >
        <Title level={3} style={{ textAlign: "center", marginBottom: 24 }}>
          POS Login
        </Title>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Enter a valid email" },
            ]}
          >
            <Input placeholder="admin@example.com" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password placeholder="••••••••" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large">
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
