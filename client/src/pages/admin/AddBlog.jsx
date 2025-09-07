import React, { useState } from 'react'
import { assets, blogCategories } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext';

const AddBlog = () => {

  const {axios} = useAppContext()
  const [isAdding, setIsAdding] = useState(false)

  const [image, setImage] = useState(false);
  const[title, setTitle] = useState('');
  const[subTitle, setSubTitle] = useState('');
  const[category, setCatagory] = useState('Startup');
  const[published, setPublished] = useState(false);

  const generateContent = async()=>{

  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    
  }
  return (
    <form onSubmit={onSubmitHandler} className='flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll'>
      <div className='bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded'>
        <p>Upload thumbnail</p>
        <label htmlFor="image">
          <img src={!image ? assets.upload_area : URL.createObjectURL(image)} className='mt-2 h-16 rounded cursor-pointer' alt="" />
          <input onChange={(e)=> setImage(e.target.files[0])} type="file" id="image" hidden required />
        </label>

        <p className='mt-4'> Blog Title</p>
        <input type="text" placeholder='enter your blog title' required className='w-full max-w-l mt-2 p-2 border border-gray-300 outline-none rounded ' onChange={e => setTitle (e.target.value)} value={title} />

        <p className='mt-4'> Blog Sub Title</p>
        <input type="text" placeholder='enter your blog  sub title' required className='w-full max-w-l mt-2 p-2 border border-gray-300 outline-none rounded ' onChange={e => setSubTitle (e.target.value)} value={subTitle} />

        <p className='mt-4'> Blog Discription</p>
        <div className='max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative'>
         <button  type='button' onClick={generateContent} className='absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer'> generate with ai </button>
         
        </div>
        <p className='mt-4'> Blog category</p>
        <select onChange={e => setCatagory(e.target.value)} name="category" id="" className='mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded'>
          <option value="">select category</option>
          {blogCategories.map((item, index) ={
            return(

            <option key={index} value={item}> {item} </option>\)
          })}
        </select>
        </div>     
    </form>
  )
}

export default AddBlog
