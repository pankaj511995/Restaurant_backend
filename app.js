const app=require('express')()
require('dotenv').config()
const cors=require('cors')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')

const ResturantRout=require('./router/restaurant')
const AdminRout=require('./router/admin')

app.use(cors())
app.use(bodyParser.json({extended:false}))

app.use('/restaurant',ResturantRout)
app.use('/admin',AdminRout)



mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log('connected ')
    app.listen(process.env.PORT)
}).catch(err=>console.log(err.message,'app.js mongo connect error'))
 