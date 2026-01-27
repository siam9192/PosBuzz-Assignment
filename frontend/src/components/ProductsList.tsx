import { Button, Dropdown, Grid, Space, Table, Typography, type MenuProps, type TableProps } from "antd";
import type { Product } from "../types/product.type";
import { SlOptionsVertical } from "react-icons/sl";
import AddProductModal from "./AddProductModal";
import EditProductModal from "./EditProductModal";
import CreateSaleModal from "./CreateSaleModal";

const demo: Product[] = [
  { id: "1", name: "Wireless Mouse", sku: "WM-001", price: 25.99, stock_quantity: 120, created_at: "2026-01-28T08:00:00Z", updated_at: "2026-01-28T08:00:00Z" },
  { id: "2", name: "Mechanical Keyboard", sku: "MK-002", price: 79.5, stock_quantity: 60, created_at: "2026-01-28T08:05:00Z", updated_at: "2026-01-28T08:05:00Z" },
  { id: "3", name: "Gaming Headset", sku: "GH-003", price: 49.99, stock_quantity: 80, created_at: "2026-01-28T08:10:00Z", updated_at: "2026-01-28T08:10:00Z" },
  { id: "4", name: "USB-C Hub", sku: "UH-004", price: 34.99, stock_quantity: 150, created_at: "2026-01-28T08:15:00Z", updated_at: "2026-01-28T08:15:00Z" },
  { id: "5", name: "External SSD 1TB", sku: "ES-005", price: 129.99, stock_quantity: 45, created_at: "2026-01-28T08:20:00Z", updated_at: "2026-01-28T08:20:00Z" },
  { id: "6", name: "Bluetooth Speaker", sku: "BS-006", price: 59.99, stock_quantity: 70, created_at: "2026-01-28T08:25:00Z", updated_at: "2026-01-28T08:25:00Z" },
  { id: "7", name: "Smartwatch", sku: "SW-007", price: 199.99, stock_quantity: 35, created_at: "2026-01-28T08:30:00Z", updated_at: "2026-01-28T08:30:00Z" },
  { id: "8", name: "Laptop Stand", sku: "LS-008", price: 29.99, stock_quantity: 90, created_at: "2026-01-28T08:35:00Z", updated_at: "2026-01-28T08:35:00Z" },
  { id: "9", name: "Webcam 1080p", sku: "WC-009", price: 39.99, stock_quantity: 50, created_at: "2026-01-28T08:40:00Z", updated_at: "2026-01-28T08:40:00Z" },
  { id: "10", name: "Portable Charger 20000mAh", sku: "PC-010", price: 49.5, stock_quantity: 100, created_at: "2026-01-28T08:45:00Z", updated_at: "2026-01-28T08:45:00Z" }
];

const items = (product: Product): MenuProps['items'] => [
  { key: '1', label: <CreateSaleModal product={product} /> },
  { key: '2', label: <EditProductModal /> },
  { key: '3', label: <a target="_blank" rel="noopener noreferrer" href="#">Delete</a> },
];

const columns: TableProps<Product>['columns'] = [
  { title: 'Name', dataIndex: 'name', key: 'name', render: text => <Typography.Text strong>{text}</Typography.Text> },
  { title: 'SKU', dataIndex: 'sku', key: 'sku', render: text => <Typography.Text>{text}</Typography.Text> },
  { title: 'Price', dataIndex: 'price', key: 'price', render: text => <Typography.Text>${text}</Typography.Text> },
  { title: 'Stock Quantity', dataIndex: 'stock_quantity', key: 'stock_quantity', render: text => <Typography.Text>{text}</Typography.Text> },
  { title: 'Created At', dataIndex: 'created_at', key: 'created_at', render: date => <Typography.Text>{new Date(date).toLocaleString()}</Typography.Text> },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Dropdown menu={{ items: items(record) }} placement="bottomLeft">
        <Button size="small" type="dashed">
          <SlOptionsVertical />
        </Button>
      </Dropdown>
    ),
  },
];

const data: Product[] = demo.map(p => ({ ...p, key: p.id }));

const { useBreakpoint } = Grid;

export default function ProductsList() {
  const screens = useBreakpoint();
  const isMobile = screens.xs || screens.sm || screens.md;

  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '10px'
        }}
      >
        <Typography.Title level={3} style={{ margin: 0 }}>
          Products List
        </Typography.Title>
        <Typography.Text>Showing 10 of 100 products</Typography.Text>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '10px 0' }}>
        <AddProductModal />
      </div>

      <div style={{ overflowX: 'auto' }}>
        <Table<Product> columns={columns} dataSource={data} style={{ marginTop: 20 }} />
      </div>
    </div>
  );
}
