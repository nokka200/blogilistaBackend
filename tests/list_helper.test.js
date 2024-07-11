const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')


test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => { 
  test('of empty list is zero', () => { 

  })

  test('when list has only one blog equals the likes of that', () => { 

  })

  test('of a bigger list is calculated right', () => { 
    
  })
})