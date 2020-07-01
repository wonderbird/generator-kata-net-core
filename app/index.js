var Generator = require('yeoman-generator');
var ClassLibraryGenerator = require('./class-library-generator');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);
        this.classLibraryGenerator = new ClassLibraryGenerator(this);
    }

    install() {
        this.classLibraryGenerator.generate();
    }
}
