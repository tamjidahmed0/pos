import React, { useState } from 'react';
import { Button, Card, message, Modal, Space, Table, Tag, Input, InputNumber } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import type { Product, ProductFormData } from '../../types';
import { usePOSStore } from '../../store/usePOSStore';



const Products: React.FC = () => {
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [formData, setFormData] = useState<ProductFormData>({
        name: '',
        sku: '',
        price: 0,
        stock_quantity: 0,
    });

    const products = usePOSStore((state) => state.products);
    const setProducts = usePOSStore((state) => state.setProducts);
    const updateProducts = usePOSStore((state) => state.updateProduct);


    // Show Modal
    const showModal = (product?: Product) => {
        if (product) {
            setEditingProduct(product);
            setFormData({ ...product });
        } else {
            setEditingProduct(null);
            setFormData({ name: '', sku: '', price: 0, stock_quantity: 0 });
        }
        setIsModalVisible(true);
    };

    // Handle Save (Add/Edit)
    const handleOk = () => {
        const { name, sku, price, stock_quantity } = formData;
        if (!name || !sku || price <= 0 || stock_quantity < 0) {
            message.error('Please fill all fields correctly!');
            return;
        }

        if (editingProduct) {
            // Edit
            updateProducts(editingProduct.id, formData);
            message.success('Product updated successfully!');
        } else {
            // Add
            const newProduct: Product = { id: products.length + 1, ...formData };
            setProducts([...products, newProduct]);
            message.success('Product added successfully!');
        }

        setIsModalVisible(false);
        setFormData({ name: '', sku: '', price: 0, stock_quantity: 0 });
        setEditingProduct(null);
    };

    // Delete
    const handleDelete = (id: number) => {
        Modal.confirm({
            title: 'Delete Product',
            content: 'Are you sure you want to delete this product?',
            onOk: () => {
                setProducts(products.filter(p => p.id !== id));
                message.success('Product deleted successfully!');
            },
        });
    };

    const productColumns = [
        { title: 'Product Name', dataIndex: 'name', key: 'name' },
        { title: 'SKU', dataIndex: 'sku', key: 'sku' },
        { title: 'Price', dataIndex: 'price', key: 'price', render: (price: number) => `৳${price.toLocaleString()}` },
        { title: 'Stock', dataIndex: 'stock_quantity', key: 'stock_quantity', render: (stock: number) => <Tag color={stock === 0 ? 'red' : stock < 10 ? 'orange' : 'green'}>{stock}</Tag> },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: Product) => (
                <Space>
                    <Button type="primary" icon={<EditOutlined />} onClick={() => showModal(record)} />
                    <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} />
                </Space>
            ),
        },
    ];

    return (
        <>
            <Card
                title="Product Management"
                extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>Add Product</Button>}
            >
                <Table dataSource={products} columns={productColumns} rowKey="id" pagination={{ pageSize: 10 }} />
            </Card>

            {/* Modal */}
            <Modal title={editingProduct ? 'Edit Product' : 'Add Product'} open={isModalVisible} onOk={handleOk} onCancel={() => setIsModalVisible(false)}>
                <div style={{ marginBottom: 16 }}>
                    <label>Product Name</label>
                    <Input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Enter product name" />
                </div>
                <div style={{ marginBottom: 16 }}>
                    <label>SKU</label>
                    <Input value={formData.sku} onChange={e => setFormData({ ...formData, sku: e.target.value })} placeholder="Enter SKU" />
                </div>
                <div style={{ marginBottom: 16 }}>
                    <label>Price (৳)</label>
                    <InputNumber style={{ width: '100%' }} value={formData.price} onChange={value => setFormData({ ...formData, price: value || 0 })} min={0} />
                </div>
                <div style={{ marginBottom: 16 }}>
                    <label>Stock Quantity</label>
                    <InputNumber style={{ width: '100%' }} value={formData.stock_quantity} onChange={value => setFormData({ ...formData, stock_quantity: value || 0 })} min={0} />
                </div>
            </Modal>
        </>
    );
};

export default Products;
