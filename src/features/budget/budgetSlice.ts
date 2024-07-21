import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BudgetParam, BudgetState } from "types";
import { getWithParams } from "./budgetAPI";

const initialState : BudgetState = {
    selectedBudget: null,
    budgets: [],
    status: "idle",
    params: {
        startDate: "",
        endDate: "",
        pageSize: 10,
        sortBy: "name",
        sortDir: "desc",
        pageNo: 0,
        totalPages: 0,
        totalElements: 0,
    },
    isLoading: false,
};

export const fetchBudget = createAsyncThunk(
    "budgets/get",
    async (params: BudgetParam) => {
        return await getWithParams(params);
    }
);


export const budgetSlice = createSlice({
    name: "budget",
    initialState,
    reducers: {
        setSelectedBudget: (state, action) => {
            state.selectedBudget = action.payload;
        },
        setBudgetParams: (state, action) => {
            state.params = action.payload;
        },
        setBudgets: (state, action) => {
            state.status = "idle";
            state.budgets = action.payload.items;
            state.params.pageNo = action.payload.pageNo;
            state.params.pageSize = action.payload.pageSize;
            state.params.sortBy = action.payload.sortBy;
            state.params.sortDir = action.payload.sortDir;
            state.params.totalPages = action.payload.totalPages;
            state.params.totalElements = action.payload.totalElements;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchBudget.pending, (state) => {
                state.status = "loading";
                state.isLoading = true;
            })
            .addCase(fetchBudget.fulfilled, (state, action) => {
                state.status = "idle";
                state.budgets = action.payload.items;
                state.params.pageNo = action.payload.pageNo;
                state.params.pageSize = action.payload.pageSize;
                state.params.sortBy = action.payload.sortBy;
                state.params.sortDir = action.payload.sortDir;
                state.params.totalPages = action.payload.totalPages;
                state.params.totalElements = action.payload.totalElements;
                state.isLoading = false
            })
            .addCase(fetchBudget.rejected, (state) => {
                state.status = "failed";
                state.isLoading = false;
            });
    },
});

export const { setSelectedBudget, setBudgetParams, setBudgets, setLoading } = budgetSlice.actions;

export const getBudgets = (state: { budget: BudgetState }) => state.budget.budgets;
export const getSelectedBudget = (state: { budget: BudgetState }) => state.budget.selectedBudget;
export const getBudgetParams = (state: { budget: BudgetState }) => state.budget.params;
export const getBudgetStatus = (state: { budget: BudgetState }) => state.budget.status;
export const getBudgetIsLoading = (state: { budget: BudgetState }) => state.budget.isLoading;

export default budgetSlice.reducer;