import type { ReactNode } from 'react'
import ThemeProvider from './ThemeProvider'
import { BrowserRouter } from 'react-router-dom'

interface Props {
  children: ReactNode
}

function Provider({ children }: Props) {
  return (
   <ThemeProvider>
   <BrowserRouter>
    {
      children
    }
   </BrowserRouter>
   </ThemeProvider>
  )
}

export default Provider
