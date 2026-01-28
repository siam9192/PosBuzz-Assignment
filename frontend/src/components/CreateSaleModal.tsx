import { App, Button, Form, InputNumber, Modal, Typography } from "antd";
import { useState } from "react";
import type { Product } from "../types/product.type";
import { useMutation } from "@tanstack/react-query";
import { createSale } from "../api-services/sale.api";
import { queryClient } from "../providers/Provider";
import type { CreateSalePayload } from "../types/sale";

interface Props {
  product: Product;
}

function CreateSaleModal({ product }: Props) {
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [form] = Form.useForm();

  const { message } = App.useApp();

  const showModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    form.resetFields();
    setErrorMessage("");
    setOpen(false);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: createSale,
    onSuccess(data) {
      message.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["products"] });
      closeModal();
    },
    onError(err: any) {
      setErrorMessage(err.message);
      message.error(err.message);
    },
  });

  const onFinish = (values: CreateSalePayload) => {
    setErrorMessage("");
    mutate({ ...values, productId: product.id });
  };

  return (
    <>
      <a onClick={showModal} style={{ cursor: "pointer" }}>
        Create Sale
      </a>

      <Modal title="Create Sale" open={open} onCancel={closeModal} footer={null}>
        <div>
          <Typography.Text>
            Product: <Typography.Text strong>{product.name}</Typography.Text>
          </Typography.Text>
          <br />
          <Typography.Text>
            Total Price:{" "}
            <Typography.Text strong>${(product.price * quantity).toFixed(2)}</Typography.Text>
          </Typography.Text>
        </div>

        <Form
          layout="vertical"
          style={{ marginTop: "20px" }}
          onFinish={onFinish}
          initialValues={{ quantity: 1 }}
        >
          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[
              { required: true, message: "Please enter quantity" },
              {
                validator: (_, value) =>
                  value >= 1 ? Promise.resolve() : Promise.reject("Quantity must be at least 1"),
              },
            ]}
          >
            <InputNumber
              placeholder="Quantity"
              min={1}
              style={{ width: "100%" }}
              value={quantity}
              onChange={(val) => setQuantity(val || 1)}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={isPending}>
              Create Sale
            </Button>
          </Form.Item>
          {errorMessage && <Typography.Text type="danger">{errorMessage}</Typography.Text>}
        </Form>
      </Modal>
    </>
  );
}

export default CreateSaleModal;
