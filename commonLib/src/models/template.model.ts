export class Template {
  name: string;
  displayName: string;
  html: string;
  css: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Partial<Template> = {}) {
    this.name = data.name || '';
    this.displayName = data.displayName || '';
    this.html = data.html || '';
    this.css = data.css || '';
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  getFullHtml(): string {
    return this.html.replace('</head>', `<style>${this.css}</style></head>`);
  }

  fillWithData(resumeData: any): string {
    let filledHtml = this.getFullHtml();
    
    const replaceTokens = (html: string, data: any, prefix: string = ''): string => {
      for (const [key, value] of Object.entries(data)) {
        const token = `{{${prefix}${key}}}`;
        if (typeof value === 'object' && value !== null) {
          html = replaceTokens(html, value, `${prefix}${key}.`);
        } else {
          html = html.replace(new RegExp(token, 'g'), String(value || ''));
        }
      }
      return html;
    };

    return replaceTokens(filledHtml, resumeData);
  }
}