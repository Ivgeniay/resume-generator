import { Injectable, NotFoundException } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';
import { TemplateListResponseDto, TemplateContentResponseDto } from "commonLib";

@Injectable()
export class TemplateService {
  private readonly templatesPath = join(process.cwd(), 'src', 'templates');

  async getTemplatesList(): Promise<TemplateListResponseDto> {
    try {
      const directories = await fs.readdir(this.templatesPath, { withFileTypes: true });
      const templates = directories
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);
      
      return { templates };
    } catch (error) {
      throw new NotFoundException('Templates directory not found');
    }
  }

  async getTemplateContent(templateName: string): Promise<TemplateContentResponseDto> {
    const templatePath = join(this.templatesPath, templateName);
    const htmlPath = join(templatePath, 'index.html');
    const cssPath = join(templatePath, 'style.css');

    try {
      const [htmlExists, cssExists] = await Promise.all([
        this.fileExists(htmlPath),
        this.fileExists(cssPath)
      ]);

      if (!htmlExists) {
        throw new NotFoundException(`Template ${templateName} not found`);
      }

      const html = await fs.readFile(htmlPath, 'utf-8');
      const css = cssExists ? await fs.readFile(cssPath, 'utf-8') : '';

      return {
        name: templateName,
        html,
        css
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new NotFoundException(`Error reading template ${templateName}`);
    }
  }

  private async fileExists(path: string): Promise<boolean> {
    try {
      await fs.access(path);
      return true;
    } catch {
      return false;
    }
  }
}