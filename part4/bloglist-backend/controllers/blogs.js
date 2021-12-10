/* eslint-disable no-undef */
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const middleware = require('../utils/middleware');


//fetch all blogs
blogsRouter.get('/', async(req, res) => {
    const blogs = await Blog.find({}).populate('creator',{username:1, name:1, id:1});
    res.json(blogs.map(blog => blog.toJSON()));
});

//fetch 1 specific blog
blogsRouter.get('/:id', async(req, res) =>{
    const id = req.params.id;
    const blog = await Blog.findById(id);
    if (blog){
        res.json(blog.toJSON());
    }else {
        res.status(404).end();
    }        
});

//delete a specific blog
blogsRouter.delete('/:id', middleware.userExtractor, async(req, res) =>{
    //fetch blog infor
    const blog = await Blog.findById(req.params.id);
    const creatorId = blog.creator.toString();

    //infor of user who request delete action
    const user = req.user;
    
    if(creatorId === user.id){
        await Blog.findByIdAndRemove(req.params.id);
        // remove blogId in user.blogs - not sucessfull
        /*
        const updateUser = await User.findById(user.id);
        updateUser.blogs = updateUser.blogs.filter(item => item.id !== user.id);
        await updateUser.save();
        */ 
        res.status(204).end();
    }else{
        res.status(400).json({error: 'user can only delete its own blog'});
    }
});

//update a specific blog
blogsRouter.put('/:id', middleware.userExtractor, async(req, res) =>{
    const body = req.body;
    const creatorId = body.creator.toString();

    //infor of user who request update action
    const user = req.user;

    const updateBlog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0
    };

    if(creatorId === user.id){
        const update = await Blog.findByIdAndUpdate(id, updateBlog, { new: true });
        res.json(update);
    }else{
        res.status(400).json({error: 'user can only update its own blog'});
    }    
});


//create new blog
blogsRouter.post('/', async(req, res)=>{
    const body = req.body;
    const token = req.token;
    const user = req.user;
    
    if (!token || !user.id){
        return res.status(401).json({error:'invalid username or password'});
    }
    const creator = await User.findById(user.id);

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        creator: user.id
    });

    const savedBlog = await blog.save();

    //update user.blogs
    creator.blogs = creator.blogs.concat(savedBlog._id);
    await creator.save();
    res.status(201).json(savedBlog);
});
    
module.exports = blogsRouter;