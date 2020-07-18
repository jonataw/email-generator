import fs from 'fs';
import sass from 'node-sass';

export class SassCompiler {
  private readonly SOURCE_DIR = './src/styles';

  private compiled: string[] = [];

  public compile(): void {
    try {
      const files = fs.readdirSync(this.SOURCE_DIR);
      files.forEach((file) => {
        try {
          const compiled = sass.renderSync({
            data: fs.readFileSync(this.SOURCE_DIR + '/' + file).toString()
          });

          const filename =
            this.SOURCE_DIR + '/' + file.substring(0, file.lastIndexOf('.')) + '.css';
          fs.writeFileSync(filename, compiled.css);

          this.compiled.push(filename);
        } catch (error) {
          console.error(`Unable to read SASS file '${this.SOURCE_DIR}'`);
        }
      });
    } catch (error) {
      console.error(`Unable to read directory '${this.SOURCE_DIR}'`);
      throw error;
    }
  }

  public cleanup(): void {
    this.compiled.forEach((file) => {
      fs.unlinkSync(file);
    });
  }
}
