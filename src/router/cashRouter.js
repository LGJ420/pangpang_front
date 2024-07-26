import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const Wallet = lazy(() => import("../pages/cash/CashWalletPage"));

const cashRouter = () => {

  return [

    {
      path: "",
      element: <Navigate replace to="wallet" />
    },

    {
      path: "wallet",
      element: <Suspense><Wallet /></Suspense>
    }
  ]
}

export default cashRouter;