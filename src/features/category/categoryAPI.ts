import axiosInstance from '../../utils/api';

export async function get(){
    const response = await  axiosInstance.get('/api/v1/categories');
    return response.data;
}