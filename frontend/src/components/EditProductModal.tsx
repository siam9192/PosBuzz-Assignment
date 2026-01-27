import { Button, Form, Input, InputNumber, Modal } from 'antd';
import React, { useState } from 'react';

function EditProductModal() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const showModal = () => setOpen(true);

  const handleCancel = () => setOpen(false);

  const onFinish = (values: any) => {
    setLoading(true);
    console.log('Product Data:', values);
    // simulate API call
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 1000);
  };

  return (
    <>
    <a  onClick={showModal}>Edit Product</a>

      <Modal
        title="Edit Product"
        open={open}
        onCancel={handleCancel}
        footer={null} // remove default OK/Cancel buttons
      >
        <Form layout="vertical"  onFinish={onFinish}>
          <Form.Item
            label="Product Name"
            name="name"
            rules={[{ required: true, message: 'Please enter product name',max:100}]}
            
          >
            <Input placeholder="Product Name"  />
          </Form.Item>

          <Form.Item
            label="SKU"
            name="sku"
            rules={[{ required: true, message: 'Please enter product SKU',max:50 }]}
          >
            <Input placeholder="SKU" />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: 'Please enter price',min:1}]}
          >
            <InputNumber
              placeholder="Price"
              min={0}
              style={{ width: '100%' }}
              formatter={(value) => `$ ${value}`}
            />
          </Form.Item>

          <Form.Item
            label="Stock Quantity"
            name="stock_quantity"
            rules={[{ required: true, message: 'Please enter stock quantity' }]}
          >
            <InputNumber placeholder="Stock Quantity" min={0} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Add Product
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default EditProductModal;
