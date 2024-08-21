import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const List = lazy(() => import("../pages/product/ProductListPage"));
const Detail = lazy(() => import("../pages/product/ProductDetailPage"));
const Add = lazy(() => import("../pages/product/ProductAddPage"));
const Modify = lazy(() => import("../pages/product/ProductModifyPage"));

const productRouter = () => {

  return [

    {
      path: "",
      element: <Navigate replace to="list" />
    },

    {
      path: "list",
      element: <Suspense><List /></Suspense>
    },
    
    {
      path: "read/:id",
      element: <Suspense><Detail /></Suspense>
    },

    {
      path: "add",
      element: <Suspense><Add /></Suspense>
    },
    {
      path: "modify/:id",
      element: <Suspense><Modify /></Suspense>
    }
    
  ]
}

export default productRouter;