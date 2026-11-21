import axios from "axios"

const instance = axios.create({
     baseURL: process.env.REACT_APP_API_URL || "https://mern-blog-app-0lw2.onrender.com/api"
})

instance.interceptors.request.use(config =>{
    config.headers.Authorization = window.localStorage.getItem('token')

    
    return config
})

export default instance
