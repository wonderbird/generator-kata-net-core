var { spawn } = require('child_process');
var chai = require('chai');

chai.should();

describe('yo kata-net-core',
    function () {
        it('should run dotnet tool to create library project',
            function (done) {
                const yo = spawn('yo', ['kata-net-core']);
                yo.on("close", code => done());
            });
    });