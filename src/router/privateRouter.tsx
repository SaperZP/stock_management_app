import {createBrowserRouter, Navigate} from "react-router-dom";
import {ErrorPage, PrivateLayout,} from "./routerPages";
import {
  AdminPanelPage,
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
        path: '/register',
        element: <Navigate to={'/'} replace/>,
      },
      {
        path: '/profile',
        element: <ProfilePage/>
      },
      {
        path: '/admin',
        element: <AdminPanelPage/>
      },
      {
        path: '/dashboard',
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
      }
    ],
  },
]);
export default PrivateRouter;
