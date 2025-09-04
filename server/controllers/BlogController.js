


export const addBlog = async (req, res) => {
    try {
        const { title, subTitle, description, category, isPublished } = JSON.parse
        ( req.body.Blog );
        const imageFile = req.file;

        //check if all fields are present

        if (!title || !description || !category || !imageFile) {
            return res.status(400).json({ success: false, message: "Title, description, category, and image are required." });
        }

        
    }catch (error) {
        res.json({sucess:false, message: error.message})
    }
}