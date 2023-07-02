import express from 'express'

const app=express()
import {config}from 'dotenv'
config()
import cors from 'cors'
import bodyParser from 'body-parser'
import{connect}from 'mongoose'

import ResturantRout from './router/restaurant.js'
import AdminRout from './router/admin.js'
import reviewAll from './router/review.js'


app.use(cors())
app.use(bodyParser.json({extended:false}))

app.use('/restaurant',ResturantRout)
app.use('/admin',AdminRout)
app.use('/review',reviewAll)


connect(process.env.MONGODB_URL).then(()=>{
    console.log('connected ')
    app.listen(process.env.PORT)
}).catch(err=>console.log(err.message,'app.js mongo connect error'))
 