import React from 'react';
import { Layout, Avatar, Button, Space, Typography } from 'antd';
import { ShopOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";


const { Header } = Layout;
const { Title, Text } = Typography;

const HeaderBar: React.FC = () => {
  const navigate = useNavigate();


  const handleLogout = () => {
    Cookies.remove("access_token");
    navigate("/", { replace: true });
  }




  return (
    <div>
      <Header
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo and Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <ShopOutlined style={{ fontSize: 32, color: '#fff' }} />
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Title level={3} style={{ margin: 0, color: '#fff', lineHeight: 1.2 }}>
              PosBuzz
            </Title>
            <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12, lineHeight: 1 }}>
              Point of Sale System
            </Text>
          </div>
        </div>

        {/* User Info */}
        <Space size="middle">
          <Avatar icon={<UserOutlined />} />
          <div style={{ color: '#fff', lineHeight: 1.2 }}>
            <div style={{ fontWeight: 600 }}>Admin User</div>

          </div>
          <Button type="text" icon={<LogoutOutlined />} style={{ color: '#fff' }} onClick={handleLogout} />
        </Space>
      </Header>

    </div>
  );
};

export default HeaderBar;
