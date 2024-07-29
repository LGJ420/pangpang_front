import { Children, Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const List = lazy(() => import("../pages/product/ProductListPage"));
const Grid = lazy(() => import("../pages/product/ProductGridListPage"));
const Detail = lazy(() => import("../pages/product/ProductDetailPage"));

const productRouter = () => {

  return [

    {
      path: "",
      element: <Navigate replace to="grid" />
    },

    {
      path: "list",
      element: <Suspense><List /></Suspense>
    },
    {
      path: "grid",
      element: <Suspense><Grid /></Suspense>
    },
    {
      path: "detail",
      element: <Suspense><Detail /></Suspense>
    }
    
  ]
}

export default productRouter;