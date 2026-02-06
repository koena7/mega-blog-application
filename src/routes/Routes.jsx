import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../components/container/AuthLayout";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import AllBlogsPage from "../pages/AllBlogsPage";
import AddBlogPage from "../pages/AddBlogPage";
import EditBlogPage from "../pages/EditBlogPage";


export const Router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: 'login',
        element: (
            <AuthLayout authRequired={false}>
                <LoginPage />
            </AuthLayout>
        )
      },
      {
        path: 'signup',
        element: (
          <AuthLayout authRequired={false}>
            <SignUpPage />
          </AuthLayout>
        )
      },
      {
        path: 'allBlogs',
        element: (
          <AuthLayout>
            <AllBlogsPage />
          </AuthLayout>
        )
      },
      {
        path: 'addBlog',
        element: (
          <AuthLayout>
            <AddBlogPage />
          </AuthLayout>
        )
      },
      {
        path: 'editBlog',
        element: (
          <AuthLayout>
            <EditBlogPage />
          </AuthLayout>
        )
      }
    ]
  }
])