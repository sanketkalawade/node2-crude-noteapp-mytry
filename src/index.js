const express = require('express');
const app = express();
require('./db/mongoose');
const userRouter = require('./routers/userRouter');
const blogRouter = require('./routers/noteRouter');

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(blogRouter);

app.listen(PORT,()=>{
    console.log("server is up and running on port "+ PORT);
    
})