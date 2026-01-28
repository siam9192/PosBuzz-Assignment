import type { ReactNode } from 'react'
import ThemeProvider from './ThemeProvider'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'
import {App as AntdApp}  from "antd"
import CurrentUserProvider from '../lib/useCurrentUser'
interface Props {
  children: ReactNode
}
export const queryClient = new QueryClient()
function Provider({ children }: Props) {
  return (
    <ThemeProvider>
      <AntdApp>
        <QueryClientProvider client={queryClient}>
          <CurrentUserProvider>
            <BrowserRouter>
              {children}
              <ToastContainer />
            </BrowserRouter>
          </CurrentUserProvider>
        </QueryClientProvider>
      </AntdApp>
    </ThemeProvider>
  );
}


export default Provider
