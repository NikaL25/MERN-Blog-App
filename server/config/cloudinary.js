import 'dotenv/config'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const uploadImage = (file) => {
    if (!file?.data || !Buffer.isBuffer(file.data)) {
        throw new Error('Uploaded image data is missing')
    }

    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: 'mern-blog/posts',
                resource_type: 'image',
            },
            (error, result) => {
                if (error) return reject(error)
                resolve(result)
            },
        )

        stream.end(file.data)
    })
}

export const deleteImage = async (publicId) => {
    if (!publicId) return

    return cloudinary.uploader.destroy(publicId, {
        resource_type: 'image',
        invalidate: true,
    })
}

export default cloudinary
