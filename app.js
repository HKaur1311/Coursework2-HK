var express = require("express"); // Requires the Express module
const app = express();
app.set('json spaces', 3);
const cors = require('cors');

const  products = require('./routes/lessons');
const users = require('./routes/user');
const homepage = require('./routes/home');
 
app.use((req,res,next) => {
    console.log('logging the request');
    next();

});
app.use(cors());

app.use(products);
 
app.use(users);
app.use(homepage);
app.get('/lessons.js', (req,res)=>{
    res.sendFile(path.join(__dirname, '../','public', 'lessons.js'));
})

app.listen(3000,()=> {
    console.log('Server created at port 3000');
});