import { CategoryState } from "types"

const initialState: CategoryState = {
    selectedCategory: null,
    categories: [],
    isLoading: false,
    params: {
        name: null,
        description: null,
        type: null,
        pageSize: 10,
        sortBy: "name",
        sortDir: "desc",
        pageNo: 0
    }
}