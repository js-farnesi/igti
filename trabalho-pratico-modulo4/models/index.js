import mongoose from 'mongoose';
import accountModel from './accountModels.js';

const db = {};

db.url = process.env.MONGOURL;
db.mongoose = mongoose;
db.account = accountModel(mongoose);

export { db };
