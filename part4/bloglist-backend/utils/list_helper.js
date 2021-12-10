//4.3: helper functions and unit tests, step1
//receives an array of blog posts as a parameter and always returns the value 1
// eslint-disable-next-line no-unused-vars
const dummy = (blogs) =>{
    return 1;
};

//4.4: helper functions and unit tests, step2
//receives a list of blog posts as a parameter. 
//The function returns the total sum of likes in all of the blog posts.
const totalLikes = (blogs) =>{
    if (blogs.length === 0){
        return 0;
    } else if(blogs.length === 1){
        return blogs[0].likes;
    }else{
        const totalLikesOfList = blogs.reduce((sum, blog) =>{
            return sum + blog.likes;
        },0);
        return totalLikesOfList;
    }
};

//4.5*: helper functions and unit tests, step3
//receives a list of blogs as a parameter. The function finds out which blog has most likes. 
//If there are many top favorites, it is enough to return one of them.
const favouriteBlog = (blogs) =>{
    const mostLikes = blogs.reduce((max, blog)=>{
        if (blog.likes >= max) 
            return max = blog.likes;
        else
            return max;
    },0);
    const found = blogs.find(blog => blog.likes === mostLikes);
    return {
        title: found.title,
        author: found.author,
        likes: found.likes
    };
};

//4.6*: helper functions and unit tests, step4
//mostBlogs that receives an array of blogs as a parameter. 
//The function returns the author who has the largest amount of blogs. 
const mostBlogs = (blogs) =>{
    const authors = Array.from(new Set(blogs.map(blog => blog.author)));
    const authorBlog = authors.map(author =>{
        const numberOfBlog = blogs.reduce((sum, blog)=>{
            if (blog.author === author){                
                sum++;
            }
            return sum;       
        },0);
        return {
            author: author,
            blogs: numberOfBlog
        };   
    });
    const mostBlog = authorBlog.reduce((max, item)=>{
        if (item.blogs > max) 
            return max = item.blogs;
        else
            return max;
    },0);
    return authorBlog.find(item => item.blogs === mostBlog);
};
//4.7*: helper functions and unit tests, step5
//Define a function called mostLikes that receives an array of blogs as its parameter. 
//The function returns the author, whose blog posts have the largest amount of likes.

const mostLikes = (blogs) =>{
    const authors = Array.from(new Set(blogs.map(blog => blog.author)));
    const authorLikes = authors.map(author =>{
        const numberOfLikes = blogs.reduce((sum, blog)=>{
            if (blog.author === author){                
                return sum + blog.likes;
            }
            return sum;       
        },0);
        return {
            author: author,
            likes: numberOfLikes
        };   
    });
    const mostLike = authorLikes.reduce((max, item)=>{
        if (item.likes > max) 
            return max = item.likes;
        else
            return max;
    },0);
    return authorLikes.find(item => item.likes === mostLike);
};

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
};