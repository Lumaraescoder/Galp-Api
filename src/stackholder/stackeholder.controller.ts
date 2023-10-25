import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
  UseInterceptors,
  UploadedFile,
  InternalServerErrorException,
} from '@nestjs/common';
import { StakeholderService } from './stackeholder.service';
import { Stakeholder } from './strackeholder.model';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/multer.config';
import { CreateStakeholderDto } from './dto/stakeholderdto';

@Controller('stakeholders')
export class StakeholdersController {
  constructor(private readonly stakeholderService: StakeholderService) {}

  @Post()
  @UseInterceptors(FileInterceptor('logo'))
  async createStakeholder(
    @Body() createStakeholderDto: CreateStakeholderDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    try {
      return await this.stakeholderService.createStakeholder(
        createStakeholderDto,
        file,
      );
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error creating stakeholder');
    }
  }

  @Get()
  async getAllStakeholders(): Promise<any[]> {
    return this.stakeholderService.getAllStakeholders();
  }

  @Get(':id')
  async getStakeholderById(
    @Param('id') stakeholderId: string,
  ): Promise<Stakeholder> {
    return this.stakeholderService.getStakeholderById(stakeholderId);
  }

  @Put(':id')
  async updateStakeholder(
    @Param('id') stakeholderId: string,
    @Body() stakeholderData: any,
  ): Promise<Stakeholder> {
    return this.stakeholderService.updateStakeholder(
      stakeholderId,
      stakeholderData,
    );
  }

  @Delete(':id')
  async deleteStakeholder(@Param('id') stakeholderId: string): Promise<void> {
    return this.stakeholderService.deleteStakeholder(stakeholderId);
  }
}
