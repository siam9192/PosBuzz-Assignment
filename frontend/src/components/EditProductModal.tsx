import { App, Button, Form, Input, InputNumber, Modal, Typography } from "antd";
import { useState } from "react";
import type { Product, UpdateProductPayload } from "../types/product.type";
import { useMutation } from "@tanstack/react-query";
import { updateProduct } from "../api-services/product.api";
import { queryClient } from "../providers/Provider";

interface Props {
  product: Product;
}

function EditProductModal({ product }: Props) {
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [form] = Form.useForm();

  const { message } = App.useApp();

  const showModal = () => {
    setOpen(true);
    form.setFieldsValue({
      name: product.name,
      sku: product.sku,
      price: product.price,
      stock_quantity: product.stock_quantity,
    });
  };

  const closeModal = () => {
    form.resetFields();
    setErrorMessage("");
    setOpen(false);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: updateProduct,
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

  const onFinish = (values: UpdateProductPayload) => {
    setErrorMessage("");
    mutate({ id: product.id, payload: values });
  };

  return (
    <>
      <a onClick={showModal}>Edit Product</a>

      <Modal open={open} onCancel={closeModal} footer={null}>
        <Typography.Title level={3} style={{ marginTop: "-8px" }}>
          Edit Product
        </Typography.Title>

        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Product Name"
            name="name"
            rules={[{ required: true, message: "Please enter product name", max: 100 }]}
          >
            <Input placeholder="Product Name" />
          </Form.Item>

          <Form.Item
            label="SKU"
            name="sku"
            rules={[{ required: true, message: "Please enter product SKU", max: 50 }]}
          >
            <Input placeholder="SKU" />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[
              { required: true, message: "Please enter price" },
              { type: "number", min: 1, message: "Price must be at least 1" },
            ]}
          >
            <InputNumber
              style={{ width: "100%" }}
              min={1}
              formatter={(value) => `$ ${value}`}
              parser={(value) => value?.replace(/\$\s?|(,*)/g, "") as any}
            />
          </Form.Item>

          <Form.Item
            label="Stock Quantity"
            name="stock_quantity"
            rules={[
              { required: true, message: "Please enter stock quantity" },
              { type: "number", min: 1, message: "Quantity must be at least 1" },
            ]}
          >
            <InputNumber style={{ width: "100%" }} min={1} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={isPending}>
              Save
            </Button>
          </Form.Item>

          {errorMessage && <Typography.Text type="danger">{errorMessage}</Typography.Text>}
        </Form>
      </Modal>
    </>
  );
}

export default EditProductModal;
