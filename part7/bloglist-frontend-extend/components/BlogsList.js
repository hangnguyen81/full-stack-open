import React from 'react';
import { useSelector } from 'react-redux';
import Blog from './Blog';

const BlogsList = () => {
  const blogs = useSelector(state => state.blogs);
  return(
    <>
      <h1>List of favourite blogs</h1>
      {blogs.map((blog,i) =>
        <Blog
          key={i}
          blog={blog}
        />
      )}
    </>

  );
};

export default BlogsList;