import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import indexRouter from './routes/index';
import { httpLogger, errorHandler } from './middleware';

import {
artistNftMinted,
erc1155NftCreated,
fixedSaleCreated,
fixedSaleSuccessful,
transferSingle,
transferBatch,
erc1155NftMinted
} from './listeners/eventListeners';


const app = express();

// http logger
app.use(httpLogger);

// allow cross origin requests
app.use(cors());

// parsing request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// routes
app.use('/api', indexRouter);

// error handling
app.use(errorHandler);


// Calling event listen functions:
artistNftMinted();
erc1155NftMinted();
erc1155NftCreated();
transferSingle();
transferBatch();
fixedSaleCreated();
fixedSaleSuccessful();

export default app;
