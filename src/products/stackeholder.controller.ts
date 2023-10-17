import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { StackholderService } from './stackeholder.service';
import { Stackholder } from './strackeholder.model';

@Controller('stackholders')
export class StackholdersController {
  constructor(private readonly stackholderService: StackholderService) {}

  @Post()
  async createStackholder(
    @Body() stackholderData: Stackholder,
  ): Promise<Stackholder> {
    return this.stackholderService.createStackholder(stackholderData);
  }

  @Get()
  async getAllStackholders(): Promise<Stackholder[]> {
    return this.stackholderService.getAllStackholders();
  }

  @Get(':id')
  async getStackholderById(
    @Param('id') stackholderId: string,
  ): Promise<Stackholder> {
    return this.stackholderService.getStackholderById(stackholderId);
  }

  @Put(':id')
  async updateStackholder(
    @Param('id') stackholderId: string,
    @Body() stackholderData: Stackholder,
  ): Promise<Stackholder> {
    return this.stackholderService.updateStackholder(
      stackholderId,
      stackholderData,
    );
  }

  @Delete(':id')
  async deleteStackholder(@Param('id') stackholderId: string): Promise<void> {
    return this.stackholderService.deleteStackholder(stackholderId);
  }
}
