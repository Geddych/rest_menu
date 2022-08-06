import express, {Express,Request,Response} from 'express'
import { urlencoded,json } from 'body-parser'

const cors = require('cors')
const fu = require('express-fileupload')

const category = require('./controllers/category')
const position = require('./controllers/position')

const app:Express = express()
const port = process.env.PORT || 3000

app.use(urlencoded({extended:true}))
app.use(json())
app.use(fu({}))
app.use(cors())
app.use(express.static('public'))

app.get('/',category.getAll)
app.post('/category',category.create)
app.get('/category/:id',category.findOneByID)
app.patch('/category/:id',category.update)
app.delete('/category/:id',category.delete)

app.post('/position',position.create)
app.delete('/position/:id',position.delete)
app.get('/position/:id',position.getById)
app.patch('/position/:id',position.update)


app.listen(port, () => console.log(`Server is position on ${port}`))