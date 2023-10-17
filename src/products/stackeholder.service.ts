import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Stackholder } from './strackeholder.model';

@Injectable()
export class StackholderService {
  constructor(
    @InjectModel('Stackholder')
    private readonly stackholderModel: Model<Stackholder>,
  ) {}

  async createStackholder(stackholderData: Stackholder): Promise<Stackholder> {
    const createdStackholder = new this.stackholderModel(stackholderData);
    return createdStackholder.save();
  }

  async getAllStackholders(): Promise<Stackholder[]> {
    return this.stackholderModel.find().exec();
  }

  async getStackholderById(stackholderId: string): Promise<Stackholder> {
    return this.stackholderModel.findById(stackholderId).exec();
  }

  async updateStackholder(
    stackholderId: string,
    stackholderData: Stackholder,
  ): Promise<Stackholder> {
    return this.stackholderModel
      .findByIdAndUpdate(stackholderId, stackholderData, { new: true })
      .exec();
  }

  async deleteStackholder(stackholderId: string): Promise<void> {
    await this.stackholderModel.findByIdAndRemove(stackholderId).exec();
  }
}
