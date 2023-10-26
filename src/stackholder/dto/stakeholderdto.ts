import { StakeholderType } from '../strackeholder.model';

export class UpdateContractDto {
  url?: string;
  name?: string;
  createdBy?: string;
}
export class UpdateStakeholderDto {
  description?: string;
  business?: string;
  stakeholder?: string;
  location?: string;
  ceo?: string;
  contact?: string;
  cashflow?: string;
  email?: string;
  role?: string;
  keywords?: string[];
  editedby?: string;
  businesstype?: string;
  cellphone?: string;
  contracts?: UpdateContractDto[];
  stakeholderType?: StakeholderType;
}
export class CreateContractDto {
  url: string;
  name: string;
  createdBy: string;
}
export class CreateStakeholderDto {
  description: string;
  business: string;
  stakeholder: string;
  location: string;
  ceo: string;
  contact: string;
  cashflow: string;
  email: string;
  editedby?: string;
  role: string;
  readonly keywords: string[];
  cellphone: string;
  contracts: CreateContractDto[];
  stakeholderType: StakeholderType;
}
