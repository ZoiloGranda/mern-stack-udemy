const express = require('express');
const app = express();
const PORT  = 5000

const customMiddleware = (req, res, next)=>{
 console.log('midleware');
 next()
}

// app.use(customMiddleware)

app.get('/',(req, res)=>{
 res.send('hello world')
})

app.get('/about',customMiddleware,(req, res)=>{
 res.send('about')
})

app.listen(PORT, ()=>{
 console.log(`server running on ${PORT}`);
})