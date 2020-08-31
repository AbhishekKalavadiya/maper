const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const middlewares  = require('./middleware')
const entry = require('./api/entryRoute')

const app = express()

mongoose.connect("mongodb+srv://kalu:abhimk7410@maper.usnux.gcp.mongodb.net/Maper?retryWrites=true&w=majority", {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    },(err)=>{
        if(err) throw err;
        console.log("DB Connected Successfully");
})

app.use(morgan('common'))
app.use(helmet())
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.json({
        message:  'You are in server',
    })
})

app.use('/api/entry', entry)
app.use('/api/entry/remove/:id', entry)
app.use('/api/entry/update/:id', entry)

app.use(middlewares.notFound)
app.use(middlewares.errorHandler)

const port = process.env.PORT || 5000 
app.listen(port, ()=> {
    console.log(`Listining at http://localhost:${port}`)
})