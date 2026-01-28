import { useMutation } from "@tanstack/react-query";
import { App, Button, Form, Input, InputNumber, Modal, Typography } from "antd";
import { useState } from "react";
import { createProduct } from "../api-services/product.api";
import type { CreateProductPayload } from "../types/product.type";
import { queryClient } from "../providers/Provider";

function AddProductModal() {
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [form] = Form.useForm();

  const showModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const { message } = App.useApp();

  const { mutate, isPending } = useMutation({
    mutationFn: createProduct,
    onSuccess(data) {
      message.success(data.message);
      form.resetFields();
      queryClient.invalidateQueries({ queryKey: ["products"] });
      closeModal();
    },
    onError(err) {
      setErrorMessage(err.message);
      message.error(err.message);
    },
  });

  const onFinish = (values: CreateProductPayload) => {
    setErrorMessage("");
    mutate(values);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add Product
      </Button>

      <Modal open={open} onCancel={closeModal} footer={null}>
        <Typography.Title level={3} style={{ marginTop: "-8px" }} className="font-primary">
          Add New Product
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
              placeholder="Price"
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
            <InputNumber placeholder="Stock Quantity" style={{ width: "100%" }} min={1} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={isPending}>
              Submit
            </Button>
          </Form.Item>
          {errorMessage && (
            <Typography.Text strong style={{ color: "red", marginTop: "5px" }}>
              {errorMessage}
            </Typography.Text>
          )}
        </Form>
      </Modal>
    </>
  );
}

export default AddProductModal;
