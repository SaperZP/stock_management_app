import {createBrowserRouter, Navigate} from "react-router-dom";

import {PublicLayout, ErrorPage} from "./routerPages";
import {LoginPage, RegisterPage} from "../pages";

const PublicRouter = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        index: true,
        element: <LoginPage/>
      },
      {
        path: '/register',
        element: <RegisterPage/>
      },
      {
        path: '*',
        element: <Navigate to="/" replace />
      }
    ],
  }
]);

export default PublicRouter;
