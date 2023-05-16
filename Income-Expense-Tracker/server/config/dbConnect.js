const mongoose=require('mongoose');

//Connect

const dbConnect=async ()=>{
    try {
        await mongoose.connect('mongodb://localhost:27017/Expense-income');
        console.log("DB connected Success");
    } catch (error) {
        console.log(err);
        process.exit(1);
    }
}

dbConnect();