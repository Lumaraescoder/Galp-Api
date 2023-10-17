import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Stakeholder, StakeholderType } from './strackeholder.model';

@Injectable()
export class StakeholderService {
  constructor(
    @InjectModel('Stakeholder')
    private readonly stakeholderModel: Model<Stakeholder>,
  ) {}

  async createStakeholder(stakeholderData: Stakeholder): Promise<Stakeholder> {
    try {
      if (
        !Object.values(StakeholderType).includes(
          stakeholderData.stakeholderType,
        )
      ) {
        throw new Error('Invalid stakeholder type');
      }
      const createdStakeholder = new this.stakeholderModel(stakeholderData);
      return await createdStakeholder.save();
    } catch (error) {
      // Log the error and maybe send a more user-friendly error message to the client
      console.error(error);
      throw new InternalServerErrorException(
        'An error occurred while creating the stakeholder',
      );
    }
  }

  async getAllStakeholders(): Promise<Stakeholder[]> {
    return this.stakeholderModel.find().exec();
  }

  async getStakeholderById(stakeholderId: string): Promise<Stakeholder> {
    return this.stakeholderModel.findById(stakeholderId).exec();
  }

  async updateStakeholder(
    stakeholderId: string,
    stakeholderData: Stakeholder,
  ): Promise<Stakeholder> {
    return this.stakeholderModel
      .findByIdAndUpdate(stakeholderId, stakeholderData, { new: true })
      .exec();
  }

  async deleteStakeholder(stakeholderId: string): Promise<void> {
    await this.stakeholderModel.findByIdAndRemove(stakeholderId).exec();
  }
}
