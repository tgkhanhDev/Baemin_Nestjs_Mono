import { useSelector } from "react-redux";
import { RootState } from "../store";

export const useTransaction = () => {
  const { transaction, loading } = useSelector(
    (state: RootState) => state.manageTransaction
  );
  return { transaction, loading };
};
