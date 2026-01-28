import { Button, Dropdown, Grid, Table, Typography, type MenuProps, type TableProps } from "antd";
import type { Product } from "../types/product.type";
import { SlOptionsVertical } from "react-icons/sl";
import AddProductModal from "./AddProductModal";
import EditProductModal from "./EditProductModal";
import CreateSaleModal from "./CreateSaleModal";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api-services/product.api";
import { useEffect, useState } from "react";
import DeleteProductButton from "./DeleteProductButton";

const items = (product: Product): MenuProps["items"] => [
  { key: "1", label: <CreateSaleModal product={product} /> },
  { key: "2", label: <EditProductModal product={product} /> },
  {
    key: "3",
    label: <DeleteProductButton id={product.id} />,
  },
];

const columns: TableProps<Product>["columns"] = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => (
      <div style={{ minWidth: "200px" }}>
        <Typography.Text strong>{text}</Typography.Text>
      </div>
    ),
  },
  {
    title: "SKU",
    dataIndex: "sku",
    key: "sku",
    render: (text) => (
      <div style={{ minWidth: "100px" }}>
        <Typography.Text>{text}</Typography.Text>
      </div>
    ),
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    render: (text) => (
      <div style={{ minWidth: "100px" }}>
        <Typography.Text>{text}</Typography.Text>
      </div>
    ),
  },
  {
    title: "Stock Quantity",
    dataIndex: "stock_quantity",
    key: "stock_quantity",
    render: (text) => (
      <div style={{ minWidth: "100px" }}>
        <Typography.Text>{text}</Typography.Text>
      </div>
    ),
  },
  {
    title: "Created At",
    dataIndex: "created_at",
    key: "created_at",
    render: (date) => (
      <div style={{ minWidth: "100px" }}>
        <Typography.Text>{new Date(date).toLocaleString()}</Typography.Text>
      </div>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Dropdown menu={{ items: items(record) }} placement="bottomLeft">
        <Button size="small" type="dashed">
          <SlOptionsVertical />
        </Button>
      </Dropdown>
    ),
  },
];

const { useBreakpoint } = Grid;

export default function ProductsList() {
  const screens = useBreakpoint();
  const isMobile = screens.xs;
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, isLoading,refetch } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts({ page, limit }),
  });


  useEffect(()=>{
    if(!isLoading) refetch()
  },[page,limit])

  const products = data?.data ?? [];
  const meta = data?.meta;
  const tableData = products.map((_) => ({ key: _.id, ..._ }));

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Typography.Title level={3} style={{ margin: 0 }}>
          Products List
        </Typography.Title>
        <Typography.Text>Showing {products.length??0} of {meta?.total??10} products</Typography.Text>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
        <AddProductModal />
      </div>

      <div style={{ overflowX: "auto" }}>
        <Table<Product>
          columns={columns}
          loading={isLoading}
          dataSource={tableData}
          style={{ marginTop: 20 }}
          pagination={{
            pageSize:limit,
            showSizeChanger: true,
            pageSizeOptions: [10, 20, 50],
            showTotal: (total) => `Total ${total} items`,
            total: meta?.total ?? 10,
            onChange(page, size) {
              setPage(page);
              setLimit(size);
            },
          }}
        />
      </div>
    </div>
  );
}
