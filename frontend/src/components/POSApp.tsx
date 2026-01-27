import React, { useState } from 'react';
import {
  Layout,
  Menu,
} from 'antd';
import HeaderBar from './HeaderBar/HeaderBar';
import POS from './POS/POSView';
import Products from './products/products';
import StatsCards from './StatsCards/StatsCards';
import SalesHistory from './SalesHistory/SalesHistory';

const { Content } = Layout;





const POSApp: React.FC = () => {
  const [currentView, setCurrentView] = useState<string>('pos');


  return (
    <Layout style={{ minHeight: '100vh', width: '100vw' }}>
      <HeaderBar />

      <Content style={{ padding: 24 }}>
        <Menu
          mode="horizontal"
          selectedKeys={[currentView]}
          items={[
            { key: 'pos', label: 'POS' },
            { key: 'products', label: 'Products' },
            { key: 'sales', label: 'Sales History' },
          ]}
          onClick={(e) => setCurrentView(e.key)}
          style={{ marginBottom: 24 }}
        />

        <StatsCards />

        {/* Conditional Rendering */}
        {currentView === 'pos' && <POS />}
        {currentView === 'products' && <Products />}
        {currentView === 'sales' && <SalesHistory />}
      </Content>
    </Layout>
  );
};

export default POSApp;