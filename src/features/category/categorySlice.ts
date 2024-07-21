import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { CategoryParam, CategoryResponseBody, CategoryState, emptyCategory } from "types"
import { getWithParams } from "./categoryAPI";
import { Category } from './../../types/index';
import { RootState } from "store";


const initialState: CategoryState = {
    selectedCategory: emptyCategory,
    categories: [],
    status: "idle",
    params: {
        name: null,
        description: null,
        type: null,
        pageSize: 10,
        sortBy: "name",
        sortDir: "desc",
        pageNo: 0,
        totalPages: 0,
        totalElements:0
    },
    isLoading:false
}

export const fetchCategories = createAsyncThunk(
    'category/get',
    async (params: CategoryParam) => {
        return await getWithParams(params);
    }
)

export const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        setSelectedCategory: (state, action: PayloadAction<Category>) => {
            state.selectedCategory = action.payload;
        },
        setParams: (state, action: PayloadAction<CategoryParam>) => {
            state.params = action.payload;
        },
        setCategories: (state, action: PayloadAction<CategoryResponseBody>) => {
            state.status = 'idle'
            state.categories = action.payload.items
            state.params.pageNo = action.payload.pageNo
            state.params.pageSize = action.payload.pageSize
            state.params.sortBy = action.payload.sortBy
            state.params.sortDir = action.payload.sortDir
            state.params.totalPages = action.payload.totalPages
            state.params.totalElements = action.payload.totalElements
        },
        setLoading: ( state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchCategories.pending, state => {
                state.status = 'loading'
            })
            .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<CategoryResponseBody>) => {
                state.status = 'idle'
                state.categories = action.payload.items
                state.params.pageNo = action.payload.pageNo
                state.params.pageSize = action.payload.pageSize
                state.params.sortBy = action.payload.sortBy
                state.params.sortDir = action.payload.sortDir
                state.params.totalPages = action.payload.totalPages
                state.params.totalElements = action.payload.totalElements
            })
            .addCase(fetchCategories.rejected, (state) => {
                state.status = 'idle'
                state.categories = []
                state.selectedCategory = emptyCategory
            })
    },
})

export const {setParams, setSelectedCategory,setCategories,setLoading} = categorySlice.actions

export const selectedCategory = (state: RootState)=> state.category.selectedCategory;
export const getCategoryParams =  (state: RootState)=> state.category.params;
export const getCategories = (state: RootState)=> state.category.categories;
export const isLoading = (state: RootState)=> state.category.isLoading;

export default  categorySlice.reducer;