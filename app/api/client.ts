import { create } from 'apisauce';

const apiClient =  create({
    baseURL: 'http://172.16.48.188:9000/api'
})

export default apiClient