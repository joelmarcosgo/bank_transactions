import 'reflect-metadata';
import express from "express";
import 'dotenv/config'
import cors from 'cors';
import http from 'http';
// import './database';
import "../src/shared/container";
import createConnection from './database'

import routes from "./routes";

const app = express();
const server = http.createServer(app);

createConnection()

app.use(express.json())
app.use(routes);
app.use(cors());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json',
    );
    next();
});

export { server };