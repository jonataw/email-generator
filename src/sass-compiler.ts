import fs from 'fs';
import sass from 'node-sass';
import config from './config';

export class SassCompiler {
  private readonly STYLE_DIR = config.styleDir;

  private compiled: string[] = [];

  public compile(): void {
    try {
      const files = fs.readdirSync(this.STYLE_DIR);
      files.forEach((file) => {
        try {
          const compiled = sass.renderSync({
            data: fs.readFileSync(this.STYLE_DIR + '/' + file).toString()
          });

          const filename =
            this.STYLE_DIR +
            '/' +
            file.substring(0, file.lastIndexOf('.')) +
            '.css';
          fs.writeFileSync(filename, compiled.css);

          this.compiled.push(filename);
        } catch (error) {
          console.error(`Unable to read SASS file '${this.STYLE_DIR}'`);
          throw error;
        }
      });
    } catch (error) {
      console.error(`Unable to read directory '${this.STYLE_DIR}'`);
      throw error;
    }
  }

  public cleanup(): void {
    this.compiled.forEach((file) => {
      fs.unlinkSync(file);
    });
  }
}
