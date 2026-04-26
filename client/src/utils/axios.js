import axios from "axios"

const instance = axios.create({
    // baseURL: "http://localhost:3002/api"
     baseURL: "https://mern-blog-app-0lw2.onrender.com/api"
})

instance.interceptors.request.use(config =>{
    config.headers.Authorization = window.localStorage.getItem('token')

    
    return config
})

export default instance
