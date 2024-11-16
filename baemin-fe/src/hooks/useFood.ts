import { useSelector } from "react-redux";
import { RootState } from "../store";

export const useFood = () => {
  const { food } = useSelector(
    (state: RootState) => state.manageFood
  );
  return { food };
};
