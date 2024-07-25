import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const List = lazy(() => import("../pages/product/ProductListPage"));

const productRouter = () => {

  return [

    {
      path: "",
      element: <Navigate replace to="list" />
    },

    {
      path: "list",
      element: <Suspense><List /></Suspense>
    }
  ]
}

export default productRouter;