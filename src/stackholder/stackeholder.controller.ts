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
} from '@nestjs/common';
import { StakeholderService } from './stackeholder.service';
import { Stakeholder } from './strackeholder.model';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/multer.config';

@Controller('stakeholders')
export class StakeholdersController {
  constructor(private readonly stakeholderService: StakeholderService) {}

  @Post()
  @UseInterceptors(FileInterceptor('logo', multerOptions))
  async createStakeholder(
    @Body() createStakeholderDto: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.stakeholderService.createStakeholder(
      createStakeholderDto,
      file,
    );
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
