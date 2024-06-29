import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Category, CategoryParam, CategoryResponseBody, QUERY_CATEGORIES } from 'types';
import axiosInstance from 'utils/api';

export async function getWithParams(params: CategoryParam): Promise<CategoryResponseBody> {
    const filteredParams = filterParam(params);
    const query = buildQuery(filteredParams);
    const response = await axiosInstance.get(`/api/v1/categories?${query}`);
    return response.data;
}

export async function post(category: Category) {
    const response = await axiosInstance.post('/api/v1/categories', category);
    return response.data;
}

export async function put(category: Category) {
    const response = await axiosInstance.put(`/api/v1/categories/${category.id}`, category);
    return response.data;
}


function filterParam(params: CategoryParam): Partial<CategoryParam> {
    const filteredParams = Object.keys(params).reduce((acc: any, key) => {
        const value = params[key as keyof CategoryParam];
        if (value !== null && value !== undefined) {
            acc[key] = value;
        }
        return acc;
    }, {} as Partial<CategoryParam>);
    return filteredParams;
}

function buildQuery(filteredParams: Partial<CategoryParam>) {
    const queryString = Object.keys(filteredParams)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(filteredParams[key as keyof CategoryParam] as string)}`)
        .join('&');
    return queryString;
}

export const useFetchCategories = (params: CategoryParam) => {
    return useQuery<CategoryResponseBody, AxiosError>({
        queryKey: [QUERY_CATEGORIES, params],
        queryFn: () => getWithParams(params),
    });
};

export const usePostCategories = (
        onSuccess?: (data: CategoryResponseBody) => void,
        onError?: (error:AxiosError, variables: any, context: any)=>void,
        onSettled?: ()=>void) =>  {
    return useMutation({
        mutationKey: ["create_category"],
        mutationFn: post,
        onSuccess: async (data: CategoryResponseBody) => {
   
           onSuccess && onSuccess(data)
        },
        onError(error: AxiosError, variables, context) {
            onError && onError(error, variables, context);
        },
        onSettled: async () => {
            onSettled && onSettled();
          
        },
    })
}

export const usePutCategories = (
    onSuccess?: (data: CategoryResponseBody) => void,
    onError?: (error:AxiosError, variables: any, context: any)=>void,
    onSettled?: ()=>void) =>  {
return useMutation({
    mutationKey: ["update_category"],
    mutationFn: put,
    onSuccess: async (data: CategoryResponseBody) => {

       onSuccess && onSuccess(data)
    },
    onError(error: AxiosError, variables, context) {
        onError && onError(error, variables, context);
    },
    onSettled: async () => {
        onSettled && onSettled();
      
    },
})
}

