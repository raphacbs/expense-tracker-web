import { UserBodyRequest } from "types";
import axiosInstance from '../../utils/api';

export async function login(user: UserBodyRequest){
    const { email, password } = user;
    const response = await  axiosInstance.post('/api/v1/user/auth', { email, password });
    return response.data;
}