const deepmerge = require('deepmerge');
const mkdirp = require('mkdirp');

const Generator = require('yeoman-generator');
const isPathInside = require('is-path-inside');
const path = require('path');

const PlatformChoices = require('../../util/data/PlatformChoices');

module.exports = class extends Generator {
  async questions() {
    this.log(`Creating banner`);

    this.result = {
      ...this.result,
      ...await this.prompt([
      {
        type: 'input',
        name: 'size',
        message: 'Please fill in size of banner',
        default: '300x250',
        validate: input => /^\d+x\d+$/.test(input),
      },
    ])};

    this.result = {
      ...this.result,
      ...(await this.prompt({
        type: 'input',
        name: 'outputPath',
        message: 'Where do you want to put it?',
        default: `./src/${this.result.size}/`,
        validate: input => isPathInside(path.resolve(input), path.resolve(process.cwd())),
      })),
    };

    // checking if package.json is already there
    this.result = {
      ...this.result,
      ...(await this.prompt([
        {
          type: 'list',
          name: 'type',
          message: 'Type of banner is this',
          choices: Object.values(PlatformChoices),
        },
      ])),
    };
  }

  action() {
    switch (this.result.type) {
      case PlatformChoices.NETFLIX_DOUBLECLICK: {
        this.composeWith(require.resolve('./netflix-doubleclick'), this.result);
        break;
      }
      case PlatformChoices.NETFLIX_SITESERVED: {
        this.composeWith(require.resolve('./netflix-siteserved'), this.result);
        break;
      }

      case PlatformChoices.DOUBLECLICK: {
        this.composeWith(require.resolve('./doubleclick'), this.result);
        break;
      }

      case PlatformChoices.PLAIN: {
        this.composeWith(require.resolve('./plain'), this.result);
        break;
      }

      default: {
        break;
      }
    }

    // always create a static directory
    mkdirp(this.destinationPath(path.join(this.result.outputPath, 'static')), err => {
      if (err) console.error(err);
    });
  }
};
