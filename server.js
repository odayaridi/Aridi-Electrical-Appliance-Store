require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const clientRoutes  = require('./routes/ClientRoute');
const errorHandler = require('./middleware/errorHandler');
const productRoute = require('./routes/ProductRoute');
const contactrequestRoute = require('./routes/ContactRequestRoute');
const shoppingCartRoute = require('./routes/ShoppingCartRoute');
const orderRoute = require('./routes/OrderRoute');
const prodRevRoute = require('./routes/ProductReviewRoute');
const orderProdsRoute = require('./routes/OrderProdsRoute');
const HttpError = require('./utils/HttpError');


const app = express();
app.use(express.static('public'));
app.use(cors());
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));


app.use(express.json()); 
app.use(cookieParser());
app.use('/api/clients',clientRoutes) ;
app.use('/api/products', productRoute);
app.use('/api/prodReview',prodRevRoute );
app.use('/api/cReq',contactrequestRoute);
app.use('/api/shoppingCart',shoppingCartRoute);
app.use('/api/order',orderRoute);
app.use('/api/orderProds',orderProdsRoute);
app.use(errorHandler);


// // Handle 404 errors
// app.all("/*all", (req, res,next) => {
//     next(new HttpError(`Can't find ${req.originalUrl} on this server!`, 404));
// });


app.get('/register',async (req,res) => {
        res.render('register');
})

app.get('/login',async (req,res) => {
    res.render('login');
})

app.get('/home',async (req,res) => {
    res.render('home');
})

app.listen(process.env.PORT, () => {
    console.log('Server is running on port ' + process.env.PORT);
});
