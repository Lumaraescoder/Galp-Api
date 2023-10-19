import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsEnum,
  IsOptional,
  IsArray,
} from 'class-validator';
import { StakeholderType } from '../strackeholder.model';
// Adjust the import based on your file structure

export class CreateStakeholderDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  business: string;

  @IsString()
  @IsNotEmpty()
  stakeholder: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsString()
  @IsNotEmpty()
  ceo: string;

  @IsString()
  @IsOptional()
  contact?: string;

  @IsString()
  @IsOptional()
  cashflow?: string;

  // No need for logo field here as it's handled by the file upload

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  cellphone: string;

  @IsArray()
  @IsOptional()
  contracts?: {
    url: string;
    name: string;
    createdAt: Date;
    createdBy: string;
  }[];

  @IsEnum(StakeholderType)
  @IsNotEmpty()
  stakeholderType: StakeholderType;
}
