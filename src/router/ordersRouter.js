import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const Pay = lazy(() => import("../pages/orders/OrdersPayPage"));
const Result = lazy(() => import("../pages/orders/OrdersResultPage"));

const ordersRouter = () => {

  return [

    {
      path: "",
      element: <Navigate replace to="pay" />
    },

    {
      path: "pay",
      element: <Suspense><Pay /></Suspense>
    },

    {
      path: "result",
      element: <Suspense><Result /></Suspense>
    }
  ]
}

export default ordersRouter;