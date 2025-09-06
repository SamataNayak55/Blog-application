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

export const getAllBlogs = async(req, res) => {
    try{
        const blogs = await Blog.find({isPublished: true})
        res.json({success: true, blog})

    }catch(error){
        res.json({success: false, message: error.message})
    }
}


export const getBlogById = async(req, res)=>{
    try{
        const{blogId} = req.params;
        const blog = await Blog.findById(blogId)
        if(!blog){
            return res.json({success: false, message:"blog not found"});

        }
        res.json({success: true, blog})

    }catch(error){
        res.json({success: false, message: error.message})

    }
}


export const deleteBlogById = async(req, res)=>{
    try{
        const{id} = req.body;
      await Blog.findByIdAndDeleye(id);
        res.json({success: true, message: "blog deleted"})

    }catch(error){
        res.json({success: false, message: error.message})

    }
}


export const togglePublish = async (req , res) => {
    try{
        const {id} = req.body;
        const blog = await Blog.findById(id);
        blog.isPublished = !blog.isPublished;
        await blog.save();
        res.json({success: true, message: " blog status updated"})
    }catch(error){
        res.json({success: false, message: error.message})

    }
}


export const addComment = async (req, res) => {
    try{
        const {blog, name, comment} = req.body;
        const Comment = await Blog.findById(blogId);
        blog.comments.push({comment});
        await blog.save();
        res.json({success: true, message: "comment added"})
    }catch(error){
        res.json({success: false, message: error.message})