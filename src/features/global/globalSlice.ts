import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store";
import { GlobalState } from "types";



const initialState: GlobalState = {
    isLoading: false,
    isOpenDrawer: false,
    pageTitle: ""
}

export const globalSlice = createSlice({
    initialState,
    name: 'global',
    reducers:{
        setIsLoadingGlobal : (state, action: PayloadAction<boolean>)=>{
            state.isLoading = action.payload;
        },
        setIsOpenDrawer: (state, action: PayloadAction<boolean>) => {
            state.isOpenDrawer = action.payload;
        },
        setPageTitle: (state, action: PayloadAction<string>) =>{
            state.pageTitle = action.payload
        } 
    }
})

export const {setIsLoadingGlobal,setIsOpenDrawer,setPageTitle } = globalSlice.actions;

export const isLoadingGlobal = (state: RootState) => state.global.isLoading 
export const isOpenDrawer = (state: RootState) => state.global.isOpenDrawer 
export const getPageTitle = (state: RootState) => state.global.pageTitle 

export default globalSlice.reducer;