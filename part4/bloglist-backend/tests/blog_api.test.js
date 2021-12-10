const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const Blog = require('../models/blog');
const jwt = require('jsonwebtoken');

const api = supertest(app);
let token;

beforeEach(async() =>{
    //initial setup for blog
    await Blog.deleteMany({});
    const blogObjects = helper.initialBlog.map(blog => new Blog(blog));
    const promiseArray = blogObjects.map(object => object.save()); 
    await Promise.all(promiseArray);

    //initial setup for user
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash('bimat',10);
    const user = new User({username: 'root', passwordHash});
    await user.save();
    // initial setup for token
    const userForToken = {
        username: user.username,
        id: user._id,
    };
    // eslint-disable-next-line no-undef
    token = jwt.sign(userForToken, process.env.SECRET, {expiresIn: 60*60});
},10000);


/* 
Promise.all executes the promises it receives in parallel. 
If the promises need to be executed in a particular order, this will be problematic. 
In situations like this, the operations can be executed inside of a for...of block, 
that guarantees a specific execution order.
*/
/*
beforeEach(async() =>{
    await Blog.deleteMany({});
    for (let blog of helper.initialBlog){
        const blogObject = new Blog(blog);
        await blogObject.save(); 
    }
},10000);
*/

test('Blog is return as JSON', async() =>{
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);
});

//4.8: Blog list tests, step1
test('All blogs return', async () => {
    const response = await api.get('/api/blogs');  
    expect(response.body).toHaveLength(helper.initialBlog.length);
});
//4.9*: Blog list tests, step2
test('Verify id of blog', async()=>{
    const blogsAtStart = await helper.blogInDb();
    blogsAtStart.map(blog =>{
        expect(blog.id).toBeDefined();
    });
});

//4.10: Blog list tests, step3
test('Valid blog can be added', async()=>{
    const newBlog = {
        title: 'Finnish Spring',
        author: 'Hang Kaijanaho',
        url: 'https://hang.kaijanaho.fi/?p=117',
        likes: 10
    };

    await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `bearer ${token}`)
        .expect(201)
        .expect('Content-Type', /application\/json/);

    const blogAtEnd = await helper.blogInDb();
    expect(blogAtEnd).toHaveLength(helper.initialBlog.length + 1);

    const titles = blogAtEnd.map(item => item.title);
    expect(titles).toContain('Finnish Spring');
});

// 4.11*: Blog list tests, step4
//Write a test that verifies that if the likes property is missing from the request, 
//it will default to the value 0. Do not test the other properties of the created blogs yet.
//Make the required changes to the code so that it passes the test.

test('blog likes is missing, save 0 to database', async()=>{
    const newBlog = {
        title: 'Blog without likes',
        author: 'Leo Minh',
        url:'https://hang.kaijanaho.fi/?p=117'
    };
    await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `bearer ${token}`)
        .expect(201)
        .expect('Content-Type', /application\/json/);
    
    const blogsAtEnd = await helper.blogInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlog.length + 1);

    const blogsLikes = blogsAtEnd.map(item => item.likes);
    expect(blogsLikes).toContain(0);

});
//4.12*: Blog list tests, step5
//Write a test related to creating new blogs via the /api/blogs endpoint, 
//that verifies that if the title and url properties are missing from the request data, 
//the backend responds to the request with the status code 400 Bad Request.
test('Blog without title, url cannot added to database',async()=>{
    const newBlog = {
        author: 'Hang Kaijanaho',
        likes: 10
    };

    await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `bearer ${token}`)
        .expect(400);
    
    const blogAtEnd = await helper.blogInDb();
    expect(blogAtEnd).toHaveLength(helper.initialBlog.length);
});


test('a specific blog can be viewed', async()=>{
    const blogsAtStart  = await helper.blogInDb();
    const blogToView = blogsAtStart[0];
    const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/);
    expect(resultBlog.body).toEqual(blogToView);

    /*
    If blog has Date property
    This processing will turn the blog object's date property value's type from Date object into a string.
    Because of this we can't directly compare equality of the result.body and blogToView. 
    Instead, we must first perform similar JSON serialization and parsing for the blogToView 
    as the server is performing for the blog object.
    */
    //const processedBlogToView = JSON.parse(JSON.stringify(blogToView));
    //expect(resultBlog.body).toEqual(processedBlogToView);
    
});
// 4.13 Blog list expansions, step1
test('a specific blog can be deleted', async() =>{
    const blogsAtStart = await helper.blogInDb();
    const blogToDelete = blogsAtStart[0];
    
    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204);
    
    const blogsAtEnd = await helper.blogInDb();
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);

    const titles = blogsAtEnd.map(item => item.title);
    expect(titles).not.toContain(blogToDelete.title);
});

//4.14 Blog list expansions, step2
test('update a specific blog', async()=>{
    const blogsAtStart = await helper.blogInDb();
    const blogToUpdate = blogsAtStart[0];
    
    const updateBlog = {
        title: 'Happy life',
        author: 'Hanna Kaijanaho',
        url: 'https://hang.kaijanaho.fi/?p=91',
        likes: 10
    };

    await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updateBlog)
        .expect(200);
    
    const blogsAtEnd = await helper.blogInDb();
    const updatedBlog = blogsAtEnd.find(blog => blog.id ===blogToUpdate.id);
    expect(updatedBlog.title).toBe('Happy life');
    expect(updatedBlog.likes).toBe(10);
});


// test case for USER
describe('Creating new user', () =>{

    test('Adding valid user', async()=>{
        const usersAtStart = await helper.usersInDb();
    
        const newUser = {
            username: 'hang.nguyen',
            name: 'Hang Nguyen',
            password: 'hanna'
        };
    
        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/);
    
        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length+1);
    
        const usernames = usersAtEnd.map(u => u.username);
        expect(usernames).toContain(newUser.username);
    });

    test('Adding invalid user - name is existed', async()=>{
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username:'root',
            name:'superroot',
            password: 'hanna'
        };

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400);
        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length);
    });

    test('Adding invalid user - no username or password', async()=>{
        const usersAtStart = await helper.usersInDb();
        const newUser = {
            name: 'Leo Minh'
        };
        await api
            .post('/api/users')
            .send(newUser)
            .expect(400);
        
        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length);
    });
});

afterAll(() =>{
    mongoose.connection.close();
});