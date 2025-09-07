import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets, blog_data, comments_data } from '../assets/assets';
import Navbar from '../components/Navbar';
import Moment from 'moment'
import Footer from '../components/Footer';
import Loader from '../components/loader';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';


const Blog = () => {
  const {id} = useParams();

  const {axios} = useAppContext();

  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");



  const fetchBlogData = async ()=>{ 

    try{
      const {data} = await axios.get('/api/blog.${id')
      data.success ? setData(data.blog) : toast.error(data.message)
    } catch(error) {
      toast.error(error.message)
    }
  }

  const fetchComments = async ()=>{
    try{
      const {data} = await axios.post('/api/blog/comments', {blogId: id})
      if(data.success){
        setComments(data.comments)
      }else {
        toast.error(data.message);

      }
    } catch (error){
      toast.error(data.message);
    }
  }

  const addComment = async(e) => {
    e.preventDefault();
    try{
      const {date} = await axios.post('/api/blog/add-comment', {blog: id, name, content});
      if(data.success){
        toast.success(data.message)
        setName('')
        setContent('')
      } else{
        toast.error(data.message);
      }
    } catch(error) {
      toast.error(error.message);
    }
  }

  useEffect(()=>{
    fetchBlogData()
    fetchComments()
  },[])



  return  data ?(
    <div className='relative' >
      <img src={assets.gradientBackground} className='absolute -top-50 z-[-1] opacity-50' alt="" />
      <Navbar />
      <div className='text-center mt-20 text-gray-600'>
        <p className='text-primary py-4 font-medium'>Published on {Moment(data.createdAt).format('MMMM Do YYYY')}</p>
        <h1 className='text-2xl sm:text-5xl font-semiBold max-w-2xl mx-auto text-gray-800'>{data.title}</h1>
        <h3 className='my-5 max-w-lg truncate mx-auto'>{data.subTitle}</h3>
        <p className='inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 b-primary/5 font-medium text-primary'>{data.author}</p>
      </div>
      <div className='mx-5 max-w-5xl md:mx-auto my-10 mt-6'>
        <img src={data.image} className='rounded-3xl mb-5' alt="" />

        <div className='rich-text max-w-3xl mx-auto'  dangerouslySetInnerHTML={{__html: data.description}}>
        </div>
        <div className='mt-14 mb-10 max-w-3xl mx-auto'>
          <p className='font-semibold mb-4'>Comments ({comments.length})</p>
          <div className='flex flex-col gap-4'>
            {comments.map((item, index)=>(
              <div key={index} className='relative bg-primary/2 border border-primary/5 max-w-xl p-4crounded text-gray-600'>
                <div className='display inline-flex gap-2 p-3 '>
                  <img src={assets.user_icon} className='w-6' alt="" />
                  <p className='font-medium'>{item.name}</p>
                </div>
                <p className='text-sm max-w-md ml-8 pb-3'>{item.content}</p>
                <div className='absolute  right-4 bottom-8 flex items-center gap-2 text-xs'> {Moment(data.createdAt).fromNow()}</div>
              </div>
            ))}
          </div>

        </div>
        {/*add comment section */}
        <div className='max-w-3xl mx-auto'>
          <p className='font-semibold mb-4'>add your comment</p>
          <form className='flex flex-col items-start gap-4 max-w-lg' onSubmit={addComment}>

            <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder='Enter your name!!' required className='w-full p-2 border border-gray-300 rounded outline-none' />

            <textarea onChange={(e) => setContent(e.target.value)} value={content} placeholder='Add your comment here!!' className='w-full p-2 border border-gray-300 rounded outline-none h-48' required></textarea>

            <button type='submit' className='bg-primary text-white rounded p-2 px-8 hover:scale-102 transition-all cursor-pointer'>Submit</button>
          </form>
        </div>
        {/* Share Buttons */}
        <div className='my-24 max-w-3xl mx-auto'>
          <p className='font-semibold my-4'>Share this article on social media </p>
          <div className='flex'>
            <img src={assets.facebook_icon} width={50} alt="" />
            <img src={assets.twitter_icon} width={50} alt="" />
            <img src={assets.googleplus_icon} width={50} alt="" />
          </div>
        </div>
        <Footer/>

      </div>
      
    </div>
  ) : ( 
    <div>
      <Loader/>
    </div>
  )
 
}

export default Blog
