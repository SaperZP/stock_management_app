import {createBrowserRouter} from "react-router-dom";
import {ErrorPage, PrivateLayout,} from "./routerPages";

const PrivateRouter = createBrowserRouter([
  {
    path: '/',
    element: <PrivateLayout/>,
    errorElement: <ErrorPage/>,
    children: [],
  },
]);
export default PrivateRouter;
