const Blog = require('../models/blog')

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

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blog = await Blog.find({})
  return blog.map(blog => blog.toJSON())
}

module.exports = {
  initialBlog, nonExistingId, blogsInDb
}