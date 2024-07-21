import { getRequest, postRequest, putRequest } from "utils/api";
import { Budget, BudgetParam } from "types";

export async function post(budget: Budget) {
    const data = await postRequest('/api/v1/budgets', budget);
    return data;
}

export async function put(budget: Budget) {
    const response = await putRequest(`/api/v1/budgets/${budget.id}`, budget);
    return response;
}

export async function getWithParams(params: BudgetParam) {
    const response = await getRequest('/api/v1/budgets', params);
    return response;
}