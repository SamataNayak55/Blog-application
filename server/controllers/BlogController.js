import fs from 'fs';
import imagekit from '../configs/imagekit.js';

export const addBlog = async (req, res) => {
    try {
        const { title, subTitle, description, category, isPublished } = JSON.parse
        ( req.body.Blog );
        const imageFile = req.file;

        //check if all fields are present

        if (!title || !description || !category || !imageFile) {
            return res.status(400).json({ success: false, message: "Title, description, category, and image are required." });
        }

        const fileBuffer = fs.readFileSync(imageFile.path)

        //upload image to imagekit
        const responce = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: '/blogs'
        })

        //optimization through imagekit url transformation
        const optimizedImageUrl = imagekit.url({
            path: responce.filePath,
            transformation:[
                {quality: 'auto'}, //auto compresssion
                {format : 'webp'}, //convert to morden format
                {width: '1280'} // width resizing
            ]
        });

        const image = optimizedImageUrl;

        await Blog.create({title,subTitle, description, category, image, isPublished})

        res.json({success:true,message:"blog added successfully"})

        
    }catch (error) {
        res.json({sucess:false, message: error.message})
    }
}