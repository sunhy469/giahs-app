import axios from 'axios';

// BaseURL
const instance = axios.create({
    baseURL: 'http://localhost:3000/api1',
});

export function handleSearch(data : any){
    return instance.post('/home/search', data);
}

export function handlePDF(data:any){
    return instance.post("/home/pdf",data)
}
