import fs from 'fs';
import config from './config';

export class Includer {
  private readonly INCLUDES_DIR = config.includesDir;
  private template: string;

  constructor(template: string) {
    this.template = template;
  }

  public include(): string {
    let index = this.template.indexOf('#include');
    if (index !== -1) {
      const startIndex = this.template.substring(0, index).lastIndexOf('<!--');
      const endIndex =
        this.template
          .substring(startIndex, this.template.length)
          .indexOf('-->') +
        startIndex +
        '-->'.length;
      const comment = this.template.substring(startIndex, endIndex).trim();

      const segments = comment.split(' ');
      const filename =
        segments[segments.findIndex((word) => word === '#include') + 1];

      const include = fs.readFileSync(
        `${this.INCLUDES_DIR}/${filename}`,
        'utf8'
      );

      this.template = this.template.replace(comment, include);
      this.include();
    }

    return this.template;
  }
}
