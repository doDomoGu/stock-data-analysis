import express from 'express'
import connection from './utils/db.js'
const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/stock-list', async (req, res) => {
  const queryStr = 'select * from `stocks`'
  const [results] = await connection.query(queryStr)
  res.send(results)
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
