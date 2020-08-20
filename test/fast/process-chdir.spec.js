var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');

chai.should();
chai.use(sinonChai);

describe('process',
    function () {
        describe('chdir',
            function () {
                it('should throw exception if changing the working directory fails',
                    function() {
                        try {
                            process.chdir('xyz-non-existing-directory-123');
                        } catch(e) {
                            // Place breakpoint here to inspect the exception
                            //console.log(e);
                        }

                        expect(process.chdir.bind(process, 'xyz-non-existing-directory-123'))
                            .to.throw();
                    });
            });
    });