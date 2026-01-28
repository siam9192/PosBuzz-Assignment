import { ConfigProvider } from "antd";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function ThemeProvider({ children }: Props) {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontSize: 14,
          lineHeight: 1.6,

          /* ===== Brand ===== */
          colorPrimary: "#1677ff",
          colorPrimaryText: "#f5f7fa",

          colorInfo: "#6366f1",
          colorInfoText: "#ffffff",

          colorError: "#ef4444",
          colorErrorText: "#ffffff",

          /* ===== Background ===== */
          colorBgBase: "#f5f7fa",
          colorBgLayout: "#f0f2f5",
          colorBgContainer: "#ffffff",

          /* ===== Text ===== */
          colorTextBase: "#13171d",
          colorTextSecondary: "#6b7280",

          /* ===== Borders ===== */
          borderRadius: 8,
          colorBorder: "#e5e7eb",

          /* ===== Controls ===== */
          controlHeight: 40,
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}

export default ThemeProvider;
