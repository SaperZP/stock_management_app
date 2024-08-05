import {createBrowserRouter} from "react-router-dom";

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
      }
    ],
  }
]);

export default PublicRouter;
