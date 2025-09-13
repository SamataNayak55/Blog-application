import React from 'react'
import { assets } from '../../assets/assets';

const CommentTable = ({comment, fetchComments}) => {
    const {blog, createdAt, _id } = comment;
    const BlogDate = new Date(createdAt);

  return (
    <tr className='order-y border-gray-300'>
        <td className='px-6 py-4'>
            <b className='font-medium text-gray-600'>Blog </b> : {blog.title}
            <br />
            <br />
            <b className='font-medium text-gray-600'>Name</b> : {comment.name}
          <br />
            <b className='font-medium text-gray-600'>Comment</b> : {comment.content}
           </td>
        <td className='px-6 py-4 max-sm:hidden'>
            {BlogDate.toLocaleDateString()}
        </td>
        <td className='px-6 py-4'>
            <div className='inline-flex items-center gap-4'>
                {!comment.isApproved? 
                <img src={assets.tick_icon} className='w-5 hover:scale-110 transition-all cursor-pointer' alt="" /> : <p className='w-5 hover:scale-110 transition-all cursor-pointer'> </p> }
            </div>

        </td>
    </tr>
  )
}

export default CommentTable
