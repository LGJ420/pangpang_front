import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const Pay = lazy(() => import("../pages/orders/OrdersPayPage"));

const ordersRouter = () => {

  return [

    {
      path: "",
      element: <Navigate replace to="result" />
    },

    {
      path: "pay",
      element: <Suspense><Pay /></Suspense>
    },

  ]
}

export default ordersRouter;