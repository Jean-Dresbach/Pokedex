import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { Header } from "../components/Header"
import { Home } from "../pages/Home"
import { Favorites } from "../pages/Favorites"

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
