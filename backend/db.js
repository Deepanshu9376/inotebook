const mongoose =require('mongoose');
const mongoURI="mongodb://localhost:27017/inotebook"


const connectToMongo=async()=>{
    try{
         mongoose.connect(mongoURI)
         console.log("connected to mongo successfully")
    }
    catch(error) {
        console.log(error)
        process.exit()
    }
}

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/login', (req, res) => {
  res.send('Hello login!')
})
app.get('/signup', (req, res) => {
  res.send('Hello Signup!')
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

module.exports=connectToMongo;