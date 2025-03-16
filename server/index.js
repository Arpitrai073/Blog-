import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';


import Connection from './database/db.js';
import router from './Routes/routes.js';
dotenv.config();
const app = express();
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use('/', router);
const PORT = 8000;
app.listen(PORT, () => {   console.log(`Server is running on port ${PORT}  .`);} );
const USERNAME = process.env.DB_USERNAME;
const PASSWORD=process.env.DB_PASSWORD;
Connection(USERNAME,PASSWORD);