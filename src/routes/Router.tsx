import { RouterProvider, createBrowserRouter } from "react-router-dom"

import { Header } from "../components"
import { Favorites, Home } from "../pages"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/favorites",
        element: <Favorites />
      }
    ]
  }
])

export function Router() {
  return <RouterProvider router={router} />
}
