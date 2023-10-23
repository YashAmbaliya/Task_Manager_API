// require('./DB/connect');
const express = require('express');
const app = express()
const tasks = require('./routes/tasks');
const connectDB = require('./DB/connect');
require('dotenv').config();
const notFound  = require('./middlware/not-found');
const errorHandlerMiddleware = require('./middlware/error-handler');

//Middleware
app.use(express.static('./public'));
app.use(express.json());


//Routes
// app.get('/hello', (req,res)=>{
//     res.send("Tast Manager App.");
// })

app.use('/api/v1/tasks', tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);


// app.get('/api/v1/tasks')         - get all the task
// app.post('/api/v1/tasks')        - create a new task
// app.get('/api/v1/tasks/:id')     - get single task
// app.patch('/api/v1/tasks/:id')   - update task
// app.delete('/api/v1/tasks/:id')  - delete task

const port = process.env.PORT || 3000;

const start = async () =>{
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`Server is listening on http://localhost:${port}`));
    } catch (error) {
        console.log(error);
    }
}

start();

// app.listen(port, console.log(`Server is listening on http://localhost:${port}`));

