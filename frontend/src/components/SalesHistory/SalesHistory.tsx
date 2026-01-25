import { Card, Col, Descriptions, Divider, Empty, Row, Space, Typography } from 'antd'
import { usePOSStore } from '../../store/usePOSStore';

const { Title, Text } = Typography

const SalesHistory = () => {
    const salesHistory = usePOSStore((state) => state.salesHistory);

    return (
        <Card title="Sales History">
            {salesHistory.length === 0 ? (
                <Empty description="No sales yet" />
            ) : (
                <Space direction="vertical" style={{ width: '100%' }} size="large">
                    {salesHistory.map((sale) => (
                        <Card key={sale.id}>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Title level={5}>Sale #{sale.id}</Title>
                                    <Text type="secondary">
                                        {new Date(sale.date).toLocaleString()}
                                    </Text>
                                </Col>
                                <Col span={12} style={{ textAlign: 'right' }}>
                                    <Text type="secondary">Total Amount</Text>
                                    <br />
                                    <Title level={3} style={{ margin: 0, color: '#1890ff' }}>
                                        ৳{sale.total.toLocaleString()}
                                    </Title>
                                </Col>
                            </Row>
                            <Divider />
                            <Descriptions column={1} size="small">
                                {sale.items.map((item) => (
                                    <Descriptions.Item
                                        key={item.id}
                                        label={
                                            <div>
                                                <Text strong>{item.name}</Text>
                                                <br />
                                                <Text type="secondary" style={{ fontSize: '12px' }}>
                                                    {item.sku}
                                                </Text>
                                            </div>
                                        }
                                    >
                                        <div style={{ textAlign: 'right' }}>
                                            <Text>
                                                {item.quantity} × ৳{item.price}
                                            </Text>
                                            <br />
                                            <Text strong>
                                                ৳{(item.quantity * item.price).toLocaleString()}
                                            </Text>
                                        </div>
                                    </Descriptions.Item>
                                ))}
                            </Descriptions>
                        </Card>
                    ))}
                </Space>
            )}
        </Card>
    )
}

export default SalesHistory