import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { cloudinaryConfig } from 'src/clourinary/cloudinary.config';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cloudinary = require('cloudinary').v2;
@Injectable()
export class StakeholderService {
  constructor(
    @InjectModel('Stakeholder')
    private readonly stakeholderModel: Model<any>,
  ) {
    cloudinaryConfig();
  }

  async createStakeholder(
    stakeholderData: any,
    imageFile: Express.Multer.File,
  ): Promise<any> {
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

  async getAllStakeholders(): Promise<any[]> {
    return this.stakeholderModel.find().exec();
  }

  async getStakeholderById(stakeholderId: string): Promise<any> {
    return this.stakeholderModel.findById(stakeholderId).exec();
  }

  async updateStakeholder(
    stakeholderId: string,
    stakeholderData: any,
  ): Promise<any> {
    return this.stakeholderModel
      .findByIdAndUpdate(stakeholderId, stakeholderData, { new: true })
      .exec();
  }

  async deleteStakeholder(stakeholderId: string): Promise<void> {
    await this.stakeholderModel.findByIdAndRemove(stakeholderId).exec();
  }
}
