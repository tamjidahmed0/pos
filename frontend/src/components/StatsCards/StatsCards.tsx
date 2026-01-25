import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import { AppstoreOutlined, RiseOutlined, TransactionOutlined } from '@ant-design/icons';
import { usePOSStore } from '../../store/usePOSStore';


const StatsCards: React.FC = () => {
  const { products, salesHistory } = usePOSStore();

  const totalSales = salesHistory.reduce(
    (sum, sale) => sum + sale.total,
    0
  );

  const totalProducts = products.length;

  const totalStock = products.reduce(
    (sum, product) => sum + product.stock_quantity,
    0
  );

  const totalTransactions = salesHistory.length;

  return (
    <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
      <Col xs={24} sm={12} lg={6}>
        <Card>
          <Statistic
            title="Total Sales"
            value={totalSales}
            prefix="৳"
            valueStyle={{ color: '#3f8600' }}
            
          />
        </Card>
      </Col>

      <Col xs={24} sm={12} lg={6}>
        <Card>
          <Statistic
            title="Products"
            value={totalProducts}
            valueStyle={{ color: '#1890ff' }}
            suffix={<AppstoreOutlined />}
          />
        </Card>
      </Col>

      <Col xs={24} sm={12} lg={6}>
        <Card>
          <Statistic
            title="Total Stock"
            value={totalStock}
            valueStyle={{ color: '#722ed1' }}
            suffix={<RiseOutlined />}
          />
        </Card>
      </Col>

      <Col xs={24} sm={12} lg={6}>
        <Card>
          <Statistic
            title="Transactions"
            value={totalTransactions}
            valueStyle={{ color: '#fa8c16' }}
            suffix={<TransactionOutlined />}
          />
        </Card>
      </Col>
    </Row>
  );
};




export default StatsCards;
