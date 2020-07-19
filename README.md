# Email Generator

This tool inlines your CSS automatically for your email templates. It also allows you to create [includeable](#includes) common snippets for reuse in multiple templates.

## Installation
```bash
git clone https://github.com/jonataw/email-generator

cd email-generator

npm install
```

## Configuration

To override the default configuration, create a `config.json` file in the root directory.

| Key         | Type    | Default               | Description                                               |
|-------------|---------|-----------------------|-----------------------------------------------------------|
| minify      | boolean | false                 | Should the output HTML be minified?                       |
| useIncludes | boolean | true                  | Should includes be added to templates?                    |
| templateDir | string  | ./resources/templates | The directory where your email HTML templates are stored. |
| styleDir    | string  | ./resources/styles    | The directory where your email CSS/SCSS files are stored. |
| includesDir | string  | ./resources/includes  | The directory where your includes are stored.             |

## Includes

**Note**: To use includes, make sure the `useIncludes` configuration option is set to `true`.

If you have HTML that is repeated in multiple templates, e.g. a footer, you may add a `footer.html` file to the includes directory. Then, in your template add `<!-- #include footer.html -->` where the footer should be. The generator will automatically insert the included snippet in your template. See an example [here](https://github.com/jonataw/email-generator/blob/master/resources/templates/includes-example.html).

## Sass

The email-generator works automatically with Sass. Add your Sass styles in the style directory and the generator will automatically convert them to CSS before inlining.
