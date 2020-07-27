module.exports = class SolutionGenerator {
    constructor(yeoman) {
        this.yeoman = yeoman;
    }

    generateSolution() {
        this.yeoman.log('Creating .NET Core solution ...');
        this.yeoman.spawnCommandSync('dotnet',
            ['new', 'sln', '--output', 'SampleKata']);
    }

    generateClassLibrary() {
        process.chdir('SampleKata');

        this.yeoman.log('Creating .NET Core class library ...');
        this.yeoman.spawnCommandSync('dotnet',
            ['new', 'classlib', '--language', 'C#', '--name', 'SampleKata.Lib']);

        process.chdir('..');
    }

    addClassLibraryToSolution() {
        process.chdir('SampleKata');

        this.yeoman.log('Adding .NET Core class library to solution ...');
        this.yeoman.spawnCommandSync('dotnet',
            ['sln', 'add', 'SampleKata.Lib/SampleKata.Lib.csproj']);

        process.chdir('..');
    }

    generate() {
        this.generateSolution();
        this.generateClassLibrary();
        this.addClassLibraryToSolution();
    }
}