import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const List = lazy(() => import("../pages/cart/CartListPage"));

const cartRouter = () => {

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

export default cartRouter;