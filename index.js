var fs = require('fs');

const CSSInliner = require('css-inliner');
const precompile = CSSInliner.less;
const template = CSSInliner.handlebars;
const inliner = new CSSInliner({
    directory: 'styles',
    precompile,
    template
});

const ext = '.handlebars';

const he = require('he');

const consola = require('consola');

// Loop through all the files in the temp directory
fs.readdir('./templates', function (err, files) {
    if (err) {
        consola.error("Could not list the directory.", err);
        process.exit(1);
	}
    consola.start('Compiling ' + files.length + ' files')
    files.forEach(file => {
        fs.readFile('./templates/' + file, "utf8", function (err, html) {
            if (err) {
                return consola.error("Error reading file " + file, error);
            }
            inliner.inlineCSSAsync(html)
                .then(function (result) {
                    fs.writeFile("./dist/" + file.substring(0, file.lastIndexOf(".")) + ext, he.decode(result), function (err) {
                        if (err) {
                            return consola.error(err);
                        }

                        consola.ready('./dist/' + file);
                    });
                }).catch(err => {
                    consola.error('Error in template > ' + './templates/' + file)
                });
        });
    })
});