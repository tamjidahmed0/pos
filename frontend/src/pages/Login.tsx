import { Button, Card, Form, Input, Typography, message } from "antd";
import { useLogin } from "../../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const { Title } = Typography;

export default function Login() {
  const navigate = useNavigate();
  const loginMutation = useLogin();


  const isLoading = loginMutation.isPending;

  const onFinish = async (values: any) => {
    try {
      const result = await loginMutation.mutateAsync({
        email: values.email,
        password: values.password,
      });

      if (result.status === 200) {
        Cookies.set('access_token', result.access_token, { expires: 1 / 48 }) // 30 min
        message.success("Login Successful");
        navigate("/dashboard", { replace: true });
      } else if (result.status === 401) {
        message.error(result.message)
      } else {
        message.error("Something went wrong!")
      }

    } catch (err: any) {
      console.error("Login Error:", err);
      message.error(err?.response?.data?.message || err?.message || "Login Failed");
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
        style={{
          width: 400,
          borderRadius: 12,
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <Title level={3} style={{ textAlign: "center", marginBottom: 24 }}>
          POS Login
        </Title>

        {/* Added disabled={isLoading} to the Form to prevent interaction during login */}
        <Form
          layout="vertical"
          onFinish={onFinish}
          disabled={isLoading}
        >
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
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}