const express=require('express');
require('./config/dbConnect')
const usersRouter=require('../server/routes/users/userRoute')
const accountRouter=require('../server/routes/accounts/accountRoute');
const transactionsRouter=require('../server/routes/transactions/transactionsRoute');
const globalErrHandler=require('./middlewares/globalErrHandler')
const app=express();

//routes

app.use(express.json());
//users route
app.use('/api/v1/users',usersRouter);

//account routes
app.use('/api/v1/accounts',accountRouter)

//Transaction Routes
app.use('/api/v1/transactions',transactionsRouter);

//error handlers
app.use(globalErrHandler);



//listen to server
const PORT=process.env.PORT || 9000;
app.listen(PORT,console.log(`server is running in the ${PORT}`))