import * as mongoose from 'mongoose';

export const StackHolderSchema = new mongoose.Schema({
  description: String,
  business: String,
  stackholder: String,
  location: String,
  ceo: String,
  contact: String,
  contractpdf: String,
  contractdata: String,
  cashflow: String,
  logo: String,
  email: String,
  celphone: String,
});

export interface Stackholder extends mongoose.Document {
  description: string;
  business: string;
  stackholder: string;
  location: string;
  ceo: string;
  contact: string;
  contractpdf: string;
  contractdata: string;
  cashflow: string;
  logo: string;
  email: string;
  celphone: string;
}
