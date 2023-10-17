import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { StakeholderService } from './stackeholder.service';
import { Stakeholder } from './strackeholder.model';

@Controller('stakeholders')
export class StakeholdersController {
  constructor(private readonly stakeholderService: StakeholderService) {}

  @Post()
  async createStakeholder(
    @Body() stakeholderData: Stakeholder,
  ): Promise<Stakeholder> {
    return this.stakeholderService.createStakeholder(stakeholderData);
  }

  @Get()
  async getAllStakeholders(): Promise<Stakeholder[]> {
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
    @Body() stakeholderData: Stakeholder,
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
