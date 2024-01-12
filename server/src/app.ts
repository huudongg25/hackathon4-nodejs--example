import express, { urlencoded } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import controller from './controllers'

const app = express()
const PORT = 8000

app.use(urlencoded())
app.use(cors())
app.use(bodyParser.json())
app.use(express.static('public'))

controller(app)

app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
})