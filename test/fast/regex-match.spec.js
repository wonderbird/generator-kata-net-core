var chai = require('chai');

chai.should();

describe('string.match',
    function () {
        it('when tested single line string equals regex then return tested string',
            function() {
                const testedString = 'VARIABLE=variable-value';
                const regex = new RegExp('VARIABLE=variable-value');
                const result = testedString.match(regex);

                result[0].should.equal(testedString);
            });

        it('when tested multiline string contains regex in separate line then return regex without delimiters',
            function() {
                const testedString = '# Some text before\nVARIABLE=variable-value\n#Some text after';
                const searchString = 'variable-value';
                const regexSearchTerm = `VARIABLE=${searchString}`;
                const regexWithDelimiters = `^${regexSearchTerm}$`;
                const multilineOption = 'm';
                const regex = new RegExp(regexWithDelimiters, multilineOption);
                const result = testedString.match(regex);

                result[0].should.equal(regexSearchTerm);
            });
    });