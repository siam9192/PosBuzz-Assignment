import type { ReactNode } from 'react'
import ThemeProvider from './ThemeProvider'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'
import {App as AntdApp}  from "antd"
interface Props {
  children: ReactNode
}
export const queryClient = new QueryClient()

function Provider({ children }: Props) {
  return (
   <ThemeProvider>
   <AntdApp>
     <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      {
      children
      }
    </QueryClientProvider>
    <ToastContainer />
   </BrowserRouter>
  </AntdApp>
   </ThemeProvider>
  )
}

export default Provider
