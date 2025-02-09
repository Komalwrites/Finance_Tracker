const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');
const ExpenseRouter = require('./Routes/ExpenseRouter');
const ensureAuthenticated = require('./Middlewares/Auth');
const path = require('path');

require('dotenv').config();
require('./Models/db');
const PORT = process.env.PORT || 8080;
const __dirname = path.resolve();

app.get('/ping', (req, res) => {
    res.send('PONG');
});

app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);
app.use('/expenses', ensureAuthenticated, ExpenseRouter);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/build")));
    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","build","index.html"));
    })
}

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})