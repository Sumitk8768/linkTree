import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import apiRoutes from './routes/index.routes.js';
import passport from 'passport';
// import './config/passport.js';

const app = express();


app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

// app.use(passport.initialize());

app.use(express.static('public'));
app.use('/api', apiRoutes);



app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get("/*name", (req, res) => {
    res.sendFile('public/index.html', { root: process.cwd() })
})

export default app;