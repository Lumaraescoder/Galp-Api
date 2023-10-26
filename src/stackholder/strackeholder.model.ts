import * as mongoose from 'mongoose';

export enum StakeholderType {
  COMPANY = 'company',
  PERSON = 'person',
}

const ContractSchema = new mongoose.Schema({
  url: String,
  name: String,
  createdAt: { type: Date, default: Date.now },
  createdBy: String,
});

export const StakeholderSchema = new mongoose.Schema({
  description: String,
  business: String,
  stakeholder: String,
  location: String,
  ceo: String,
  contact: String,
  cashflow: String,
  logo: String,
  email: String,
  cellphone: String,
  role: String,
  businesstype: String,
  editedby: String,
  contracts: [ContractSchema],
  stakeholderType: {
    type: String,
    enum: Object.values(StakeholderType),
    required: true,
  },
  keywords: [String],
});

export interface Contract extends mongoose.Document {
  url: string;
  name: string;
  createdAt: Date;
  createdBy: string;
}

export interface Stakeholder extends mongoose.Document {
  description: string;
  business: string;
  stakeholder: string;
  location: string;
  ceo: string;
  contact: string;
  cashflow: string;
  businesstype: string;
  role: string;
  logo: string;
  email: string;
  cellphone: string;
  contracts: Contract[];
  stakeholderType: StakeholderType;
  keywords: string[]; // Corrija a definição de keywords
}
