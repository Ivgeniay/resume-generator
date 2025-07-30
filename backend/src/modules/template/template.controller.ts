import { Controller, Get, Param } from '@nestjs/common';
import { TemplateService } from './template.service';
import { TemplateListResponseDto, TemplateContentResponseDto, TemplateContentRequestDto } from 'commonLib';

@Controller('api/templates')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Get()
  async getTemplatesList(): Promise<TemplateListResponseDto> {
    return this.templateService.getTemplatesList();
  }

  @Get(':name')
  async getTemplateContent(@Param('name') name: string): Promise<TemplateContentResponseDto> {
    return this.templateService.getTemplateContent(name);
  }
}