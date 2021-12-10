const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlog = [
    {
        title: 'Happy tummy – happy life',
        author: 'Hanna Kaijanaho',
        url: 'https://hang.kaijanaho.fi/?p=91',
        likes: 8
    },
    {
        title: 'Flower will cheer you up',
        author: 'Hang Nguyen',
        url: 'https://hang.kaijanaho.fi/?p=45',
        likes: 20
    }
];

const blogInDb = async() =>{
    const blogs = await Blog.find({});
    return blogs.map(blog => blog.toJSON());
};

const nonExistingId = async () => {
    const blog = new Blog({ title: 'willremovethissoon', author: 'unknown', url:'http://notexist' });
    await blog.save();
    await blog.remove();
  
    return blog._id.toString();
};

const usersInDb = async() =>{
    const users = await User.find({});
    return users.map(user => user.toJSON());
};

module.exports = {
    initialBlog, 
    blogInDb, 
    nonExistingId,
    usersInDb
};