import express from 'express'

const app = express()

app.get('/test', (request, response) => {
  return response.json({
    method: 'GET',
    message: 'Hello World!!!'
  })
})

app.post('/test', (request, response) => {
  return response.json({
    method: 'POST',
    message: 'Hello World!!!'
  })
})

app.listen(3333, () => console.log('🤖️ Server is running on port 3333 🤖️'))