import { apiInstance } from "../constant/apiInstance";
import { Food } from "../types/food";
import { utilsResponse } from "../types/utils";

const api = apiInstance("http://localhost:8080/food-api/food");

export const manageFood = {
  getFood: () =>
    api.get<utilsResponse<Food>>(`/`),
};
