const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const assert = require('node:assert')
const helper = require('./test_helper')


beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(helper.initialBlog[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlog[1])
  await blogObject.save()
})

const api = supertest(app)

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlog.length)
})

test('blog identifying field names id', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body

  blogs.forEach(element => {
    assert.strictEqual(element.hasOwnProperty('id'), true)
  })
})

test.only('a valig blog can be added', async () => { 
  const newBlog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://test.com',
    likes: 0,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  
  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.title)

  assert.strictEqual(response.body.length, helper.initialBlog.length + 1)

  assert(contents.includes('Test Blog')) 
})

after(async () => {
  await mongoose.connection.close()
})