import * as mongoose from 'mongoose';

export enum StakeholderType {
  COMPANY = 'company',
  PERSON = 'person',
}

const ContractSchema = new mongoose.Schema({
  url: String,
  name: String,
  createdAt: { type: Date, default: Date.now },
  createby: String,
});
export interface Contract extends mongoose.Document {
  url: string;
  name: string;
  createdAt: Date;
}

export const StakeholderSchema = new mongoose.Schema({
  description: String,
  business: String,
  stakeholder: String,
  location: String,
  ceo: String,
  contact: String,
  cashflow: String,
  logo: String,
  createby: String,
  email: String,
  cellphone: String,
  role: String,
  businesstype: String,
  editedby: String,
  contracts: [ContractSchema],
  stakeholderType: {
    type: String,
    enum: Object.values(StakeholderType),
    required: false,
  },
  keywords: [String],
});

export interface Stakeholder extends mongoose.Document {
  description: string;
  business: string;
  stakeholder: string;
  location: string;
  ceo: string;
  contact: string;
  cashflow: string;
  businesstype: string;
  contractDate: string;
  role: string;
  logo: string;
  createby: string;
  email: string;
  cellphone: string;
  contracts: Contract[];
  stakeholderType: StakeholderType;
  keywords: string[];
}
