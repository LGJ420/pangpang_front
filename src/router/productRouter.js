import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div>Loading...</div>
const List = lazy(() => import("../pages/product/ProductListPage"));
const Detail = lazy(() => import("../pages/product/ProductDetailPage"));

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
      element: <Suspense fallback={Loading}><Detail /></Suspense>
    }
    
  ]
}

export default productRouter;