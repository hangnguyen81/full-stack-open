/* eslint-disable no-case-declarations */
import blogsService from '../services/blogs';

const compareLikes = (a,b) => {
  return b.likes - a.likes;
};

const blogReducer = (state = [], action) => {
  switch (action.type){
  case 'INITIALIZE':
    return action.data.sort(compareLikes);
  case 'CREATE_BLOG':
    const stateAfterCreate = [...state, action.data];
    return stateAfterCreate.sort(compareLikes);
  case 'LIKE':
    const blogToLike = state.find( a => a.id === action.data.id);
    const likedBlog = {
      ...blogToLike,
      likes: blogToLike.likes + 1
    };
    const stateAfterUpdate = state.map(blog => blog.id !== action.data.id ? blog : likedBlog);
    return stateAfterUpdate.sort(compareLikes);
  case 'REMOVE_BLOG':
    return state.filter(item => item.id !== action.data.id);
  default:
    return state;
  }
};

export const initializeBlogslist = () => {
  return async dispatch => {
    const blogs = await blogsService.getAll();
    dispatch({
      type:'INITIALIZE',
      data: blogs
    });
  };
};


export const createBlog = (blogObj) => {
  return async dispatch => {
    const returnedBlog = await blogsService.create(blogObj);
    dispatch({
      type: 'CREATE_BLOG',
      data: returnedBlog
    });
  };
};

export const handleLike = id => {
  return async dispatch => {
    const blogToUpdate = await blogsService.getOne(id);
    const updateBlog = {
      title: blogToUpdate.title,
      author: blogToUpdate.author,
      url: blogToUpdate.url,
      likes: blogToUpdate.likes + 1,
      summary: blogToUpdate.summary
    };
    await blogsService.update(id, updateBlog);
    dispatch({
      type: 'LIKE',
      data: { id }
    });
  };
};

export const removeBlog = id => {
  return async dispatch => {
    await blogsService.remove(id);
    dispatch({
      type:'REMOVE_BLOG',
      data: { id }
    });
  };
};

export default blogReducer;