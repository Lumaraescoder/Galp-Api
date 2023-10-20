import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Stakeholder, StakeholderType } from './strackeholder.model';
import { v2 as cloudinary } from 'cloudinary';
import { cloudinaryConfig } from 'src/clourinary/cloudinary.config';

@Injectable()
export class StakeholderService {
  constructor(
    @InjectModel('Stakeholder')
    private readonly stakeholderModel: Model<Stakeholder>,
  ) {
    cloudinaryConfig();
  }

  async createStakeholder(
    stakeholderData: any,
    imageFile: Express.Multer.File,
  ): Promise<Stakeholder> {
    try {
      let result;
      if (imageFile && imageFile.path) {
        result = await cloudinary.uploader.upload(imageFile.path, {
          folder: 'some-folder-name',
        });
      }

      const createdStakeholder = new this.stakeholderModel({
        ...stakeholderData,
        logo: result ? result.secure_url : undefined,
      });

      return await createdStakeholder.save();
    } catch (error) {
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
