const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const assert = require('node:assert')

const initialBlog = [
  {
    title: 'HTML is easy',
    author: 'testi 1',
    url: 'www.testi1.com',
    likes: 1,
  },
  {
    title: 'HTML is really easy',
    author: 'testi 2',
    url: 'www.testi2.com',
    likes: 2,
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlog[0])
  await blogObject.save()
  blogObject = new Blog(initialBlog[1])
  await blogObject.save()
})

const api = supertest(app)

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, initialBlog.length)
})

test.only('blog identifying field names id', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body

  blogs.forEach(element => {
    assert.strictEqual(element.hasOwnProperty('id'), true)
  })
})

after(async () => {
  await mongoose.connection.close()
})