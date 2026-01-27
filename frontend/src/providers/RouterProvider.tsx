import { type ReactNode } from 'react'
import { BrowserRouter } from "react-router-dom"
interface Props {
  children: ReactNode
}
function RouterProvider({children}:Props) {
  return (
   <BrowserRouter>
   {
    children
   }
   </BrowserRouter>
  )
}

export default RouterProvider