import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const List = lazy(() => import("../pages/product/ProductListPage"));
const Grid = lazy(() => import("../pages/product/ProductListGrid"));

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
    }
    
  ]
}

export default productRouter;