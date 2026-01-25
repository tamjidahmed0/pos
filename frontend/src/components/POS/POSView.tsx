import React, { useState } from 'react';
import { Card, Row, Col, Input, Divider, Space, Button, Badge, Empty, Typography, Tag, message, Modal } from 'antd';
import { ShoppingCartOutlined, PlusOutlined, MinusOutlined, DeleteOutlined } from '@ant-design/icons';
import { usePOSStore } from '../../store/usePOSStore';

const { Text, Title } = Typography;

const POS: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const products = usePOSStore((state) => state.products);
  const cart = usePOSStore((state) => state.cart);
  const addToCart = usePOSStore((state) => state.addToCart);
  const removeFromCart = usePOSStore((state) => state.removeFromCart);
  const updateCartQuantity = usePOSStore((state) => state.updateCartQuantity);
  const clearCart = usePOSStore((state) => state.clearCart);
  const completeSale = usePOSStore((state) => state.completeSale);


  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const cartSubtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);


  const handleCompleteSale = () => {
    if (cart.length === 0) {
      message.warning('Cart is empty!');
      return;
    }

    Modal.confirm({
      title: 'Complete Sale',
      content: `Total amount: ৳${cartSubtotal.toLocaleString()}. Do you want to complete this sale?`,
      onOk: () => {
        const sale = completeSale();
        if (sale) {
          message.success('Sale completed successfully!');
        }
      },
    });
  };

  return (
    <Row gutter={[16, 16]}>

      {/* Products List */}
      <Col xs={24} lg={16}>
        <Card title="Products">
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ marginBottom: 16 }}
          />
          <Row gutter={[16, 16]}>
            {filteredProducts.map((p) => (
              <Col xs={12} sm={8} md={6} key={p.id}>
                <Card
                  hoverable
                  onClick={() => {
                    addToCart(p);
                    p.stock_quantity === 0 && message.error('Product is out of stock!');
                  }}
                  style={{ opacity: p.stock_quantity === 0 ? 0.5 : 1 }}
                >
                  <div style={{ textAlign: 'center' }}>
                    <Title level={5}>{p.name}</Title>
                    <Text type="secondary">{p.sku}</Text>
                    <Divider />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text strong style={{ color: '#1890ff' }}>৳{p.price}</Text>
                      <Tag color={p.stock_quantity === 0 ? 'red' : p.stock_quantity < 10 ? 'orange' : 'green'}>
                        {p.stock_quantity === 0 ? 'Out' : `Stock: ${p.stock_quantity}`}
                      </Tag>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </Card>
      </Col>

      {/* Cart */}
      <Col xs={24} lg={8}>
        <Card title={<Space><ShoppingCartOutlined /> Current Order <Badge count={cart.length} /></Space>}>
          {cart.length === 0 ? (
            <Empty description="Cart is empty" />
          ) : (
            <>
              <div style={{ maxHeight: 400, overflowY: 'auto' }}>
                {cart.map((item) => (
                  <Card key={item.id} size="small" style={{ marginBottom: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <div>
                        <Text strong>{item.name}</Text>
                        <br />
                        <Text type="secondary" style={{ fontSize: 12 }}>{item.sku}</Text>
                      </div>
                      <Button type="text" danger icon={<DeleteOutlined />} onClick={() => removeFromCart(item.id)} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Space>
                        <Button size="small" icon={<MinusOutlined />} onClick={() => updateCartQuantity(item.id, item.quantity - 1)} />
                        <Text strong>{item.quantity}</Text>
                        <Button size="small" icon={<PlusOutlined />} onClick={() => updateCartQuantity(item.id, item.quantity + 1)} />
                      </Space>
                      <Text strong style={{ color: '#1890ff' }}>৳{(item.price * item.quantity).toLocaleString()}</Text>
                    </div>
                  </Card>
                ))}
              </div>
              <Divider />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                <span>Total:</span>
                <span style={{ color: '#1890ff' }}>৳{cartSubtotal.toLocaleString()}</span>
              </div>
              <Space direction="vertical" style={{ width: '100%', marginTop: 12 }}>
                <Button type="primary" block onClick={handleCompleteSale}>Complete Sale</Button>
                <Button block onClick={clearCart}>Clear Cart</Button>
              </Space>
            </>
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default POS;
