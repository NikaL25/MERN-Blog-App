const apiBaseUrl = process.env.REACT_APP_API_URL || 'https://mern-blog-app-0lw2.onrender.com/api'
const apiOrigin = apiBaseUrl.replace(/\/api\/?$/, '')

export const getImageUrl = (imageUrl) => {
    if (!imageUrl) return ''
    if (/^https?:\/\//i.test(imageUrl)) return imageUrl

    return `${apiOrigin}/${imageUrl.replace(/^\/+/, '')}`
}
