import fs from 'fs';
import InlineCss from 'inline-css';
import { SassCompiler } from './sass-compiler';
import { minify } from 'html-minifier';
import config from './config';
import { Includer } from './includer';

class EmailGenerator {
  private readonly STYLE_DIR = config.styleDir;
  private readonly TEMPLATE_DIR = config.templateDir;

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
        let html = fs.readFileSync(this.TEMPLATE_DIR + '/' + file, 'utf8');

        if (config.useIncludes) {
          html = new Includer(html).include();
        }

        let inlined = await InlineCss(html, {
          url: 'file://' + __dirname + '/../' + this.STYLE_DIR + '/'
        });

        if (config.minify) {
          inlined = minify(inlined, { collapseWhitespace: true });
        }

        fs.writeFile(
          './dist/' +
            file.substring(0, file.lastIndexOf('.')) +
            file.substring(file.lastIndexOf('.'), file.length),
          inlined,
          function (err) {
            if (err) {
              return console.error(err);
            }

            console.log('Generated ./dist/' + file);
          }
        );
      } catch (error) {
        console.error(
          `Unable to parse file '${this.TEMPLATE_DIR + '/' + file}'`
        );
        throw error;
      }
    });
  }

  private readSourceDir(): string[] {
    try {
      return fs.readdirSync(this.TEMPLATE_DIR);
    } catch (error) {
      console.error(`Unable to read directory '${this.TEMPLATE_DIR}'`);
      throw error;
    }
  }
}

new EmailGenerator();
