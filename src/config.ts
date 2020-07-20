import fs from 'fs';

interface Config {
  /**
   * Should the output HTML be minified?
   * @default false
   */
  minify: boolean;

  /**
   * Should includes be added to templates?
   * @default true
   */
  useIncludes: boolean;

  /**
   * Should media queries be preserved in the <head> styles?
   * @default true
   */
  preserveMediaQueries: boolean;

  /**
   * The directory where your email HTML templates are stored.
   * @default ./resources/templates
   */
  templateDir: string;

  /**
   * The directory where your email CSS/SCSS files are stored.
   * @default ./resources/styles
   */
  styleDir: string;

  /**
   * The directory where your includes are stored.
   * @default ./resources/includes
   */
  includesDir: string;
}

let config = {};
try {
  config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
} catch (error) {}

const defaults: Config = {
  minify: false,
  useIncludes: true,
  preserveMediaQueries: true,
  templateDir: './resources/templates',
  styleDir: './resources/styles',
  includesDir: './resources/includes'
};

export default {
  ...defaults,
  ...config
};
