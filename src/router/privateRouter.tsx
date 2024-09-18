import {createBrowserRouter, Navigate} from "react-router-dom";
import {ErrorPage, PrivateLayout,} from "./routerPages";
import {
  DashboardPage,
  ProductsPage,
  SalesPage,
  PurchasesPage,
  FirmsPage,
  BrandsPage,
  ProfilePage,
  CategoriesPage
} from "../pages";

const PrivateRouter = createBrowserRouter([
  {
    path: '/',
    element: <PrivateLayout/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        index: true,
        element: <DashboardPage/>
      },
      {
        path: '/products',
        element: <ProductsPage/>
      },
      {
        path: '/sales',
        element: <SalesPage/>
      },
      {
        path: '/purchases',
        element: <PurchasesPage/>
      },
      {
        path: '/firms',
        element: <FirmsPage/>
      },
      {
        path: '/brands',
        element: <BrandsPage/>
      },
      {
        path: '/categories',
        element: <CategoriesPage/>
      },
      {
        path: '/profile',
        element: <ProfilePage/>
      },
      {
        path: '/register',
        element: <Navigate to={'/'} replace/>,
      },
    ],
  },
]);
export default PrivateRouter;
