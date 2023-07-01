import express from 'express'
import appRoute from './routers/app.route.js'

const app = express()
app.use(express.json())

app.use('/api', appRoute)
app.listen(8080, () => console.log('Server Up!'))