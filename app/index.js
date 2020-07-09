var Generator = require('yeoman-generator');
var SolutionGenerator = require('./solution-generator');

module.exports = class GeneratorKataNetCore extends Generator {
    constructor(args, opts) {
        super(args, opts);
        this.solutionGenerator = new SolutionGenerator(this);
    }

    install() {
        this.solutionGenerator.generate();
    }
}
