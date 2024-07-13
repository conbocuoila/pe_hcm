import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout";
import Contact from "./pages/contact";
import Dashboard from "./pages/dashboard";
import Home from "./pages/home";
import Details from "./pages/details-page";
import Add from "./pages/add-page";
import Update from "./pages/update-page";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/details/:id",
          element: <Details />,
        },
        {
          path: "/update/:id",
          element: <Update />,
        },
        {
          path: "/add",
          element: <Add />,
        },
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
};

export default App;
