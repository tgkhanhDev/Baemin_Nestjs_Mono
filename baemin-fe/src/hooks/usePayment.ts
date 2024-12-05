import { useSelector } from "react-redux";
import { RootState } from "../store";

export const usePayment = () => {
  const { payment, loading, loadingPay } = useSelector(
    (state: RootState) => state.managePayment
  );
  return { payment, loading, loadingPay };
};
