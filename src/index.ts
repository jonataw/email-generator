import fs from 'fs';
import path from 'path';
import InlineCss from 'inline-css';
import { SassCompiler } from './sass';
import { minify } from 'html-minifier';
import config from './config';

class EmailGenerator {
  private readonly SOURCE_DIR = './src/templates';

  constructor() {
    const compiler = new SassCompiler();
    compiler.compile();

    this.generate();
    compiler.cleanup();
  }

  private generate() {
    const files = this.readSourceDir();
    files.forEach(async (file) => {
      try {
        const html = fs.readFileSync(this.SOURCE_DIR + '/' + file, 'utf8');
        let result = await InlineCss(html, {
          url: 'file://' + __dirname + '/' + path.dirname(file) + '/styles/'
        });

        if (config.minify) {
          result = minify(result, { collapseWhitespace: true });
        }

        fs.writeFile(
          './dist/' +
            file.substring(0, file.lastIndexOf('.')) +
            file.substring(file.lastIndexOf('.'), file.length),
          result,
          function (err) {
            if (err) {
              return console.error(err);
            }

            console.log('Generated ./dist/' + file);
          }
        );
      } catch (error) {
        console.error(`Unable to parse file '${this.SOURCE_DIR + '/' + file}'`);
        throw error;
      }
    });
  }

  private readSourceDir(): string[] {
    try {
      return fs.readdirSync(this.SOURCE_DIR);
    } catch (error) {
      console.error(`Unable to read directory '${this.SOURCE_DIR}'`);
      throw error;
    }
  }
}

new EmailGenerator();
