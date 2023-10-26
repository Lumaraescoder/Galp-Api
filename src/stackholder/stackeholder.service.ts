import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { cloudinaryConfig } from 'src/clourinary/cloudinary.config';
import { CreateStakeholderDto } from './dto/stakeholderdto';
import { Contract, Stakeholder } from './strackeholder.model';
import * as cloudinary from 'cloudinary';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class StakeholderService {
  constructor(
    @InjectModel('Stakeholder')
    private readonly stakeholderModel: Model<any>,
  ) {
    cloudinaryConfig();
  }

  async createStakeholder(
    createStakeholderDto: CreateStakeholderDto,
    file: Express.Multer.File,
  ): Promise<any> {
    try {
      const uploadResult = file ? await this.uploadToCloudinary(file) : null;

      const createdStakeholder = new this.stakeholderModel({
        ...createStakeholderDto,
        logo: uploadResult?.secure_url,
      });

      return createdStakeholder.save();
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error creating stakeholder');
    }
  }
  async uploadContract(
    stakeholderId: string,
    contractFile: Express.Multer.File,
  ): Promise<any> {
    try {
      const uploadResult = await this.uploadToCloudinary(contractFile);

      const stakeholder = await this.stakeholderModel.findById(stakeholderId);

      if (!stakeholder) {
        throw new Error('Stakeholder não encontrado.');
      }

      const newContract: Contract = {
        url: uploadResult.secure_url,
        name: contractFile.originalname,
        createdAt: new Date(),
        createdBy: stakeholderId,
      } as Contract;

      stakeholder.contracts.push(newContract);

      await stakeholder.save();

      return newContract;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'Erro ao fazer upload do contrato.',
      );
    }
  }
  private async uploadToCloudinary(
    file: Express.Multer.File,
  ): Promise<cloudinary.UploadApiResponse> {
    try {
      const fileStr = `data:${file.mimetype};base64,${file.buffer.toString(
        'base64',
      )}`;

      return cloudinary.v2.uploader.upload(fileStr, {
        public_id: `upLoads/${uuidv4()}`,
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error uploading image');
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
    keywords: string[],
  ): Promise<any> {
    try {
      stakeholderData.keywords = keywords;

      return this.stakeholderModel
        .findByIdAndUpdate(stakeholderId, stakeholderData, { new: true })
        .exec();
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error updating stakeholder');
    }
  }

  async deleteStakeholder(stakeholderId: string): Promise<void> {
    await this.stakeholderModel.findByIdAndRemove(stakeholderId).exec();
  }
}
