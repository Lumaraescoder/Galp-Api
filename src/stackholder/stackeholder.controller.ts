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
    return this.stakeholderService.createStakeholder(
      createStakeholderDto,
      file,
    );
  }

  @Post(':id/upload-contract')
  @UseInterceptors(FileInterceptor('contracts[0][url]'))
  async uploadContract(
    @Param('id') stakeholderId: string,
    @UploadedFile() contractFile: Express.Multer.File,
  ): Promise<any> {
    return this.stakeholderService.uploadContract(stakeholderId, contractFile);
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
    @Body('keywords') keywords: string[],
  ): Promise<Stakeholder> {
    return this.stakeholderService.updateStakeholder(
      stakeholderId,
      stakeholderData,
      keywords,
    );
  }

  @Delete(':id')
  async deleteStakeholder(@Param('id') stakeholderId: string): Promise<void> {
    return this.stakeholderService.deleteStakeholder(stakeholderId);
  }
}
