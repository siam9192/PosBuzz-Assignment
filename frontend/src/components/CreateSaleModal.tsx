import { Button, Form, InputNumber, Modal, Typography } from 'antd';
import { useState } from 'react';
import type { Product } from '../types/product.type';

interface Props {
  product: Product;
}

function CreateSaleModal({ product }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState<number>(1);

  const showModal = () => setOpen(true);
  const handleCancel = () => setOpen(false);

  const onFinish = (values: any) => {
    setLoading(true);
    console.log('Sale Created:', {
      product,
      quantity: values.quantity,
      totalPrice: product.price * values.quantity,
    });

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 1000);
  };

  return (
    <>
      <a onClick={showModal} style={{ cursor: 'pointer' }}>
        Create Sale
      </a>

      <Modal title="Create Sale" open={open} onCancel={handleCancel} footer={null}>
        <div>
          <Typography.Text>
            Product: <Typography.Text strong>{product.name}</Typography.Text>
          </Typography.Text>
          <br />
          <Typography.Text>
            Total Price: <Typography.Text strong>${(product.price * quantity).toFixed(2)}</Typography.Text>
          </Typography.Text>
        </div>

        <Form
          layout="vertical"
          style={{ marginTop: '20px' }}
          onFinish={onFinish}
          initialValues={{ quantity: 1 }}
        >
          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[
              { required: true, message: 'Please enter quantity' },
              {
                validator: (_, value) =>
                  value >= 1 ? Promise.resolve() : Promise.reject('Quantity must be at least 1'),
              },
            ]}
          >
            <InputNumber
              placeholder="Quantity"
              min={1}
              style={{ width: '100%' }}
              value={quantity}
              onChange={(val) => setQuantity(val || 1)}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Create Sale
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default CreateSaleModal;
