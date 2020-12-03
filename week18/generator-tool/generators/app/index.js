var Generator = require("yeoman-generator");

module.exports = class extends (
  Generator
) {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);
  }
  async initPackage() {
    this.answers = await this.prompt([
      {
        type: "input",
        name: "title",
        message: this.appname,
      },
    ]);
    const pkgJson = {
      name: this.answers.title,
      version: "1.0.0",
      description: "",
      main: "generators/app/index.js",
      scripts: {
        "build":"webpack",
        "test": "mocha -r @babel/register",
        "coverage": "nyc npm run test"
      },
      author: "",
      license: "ISC",
      devDependencies: {},
      dependencies: {},
    };

    // Extend or create package.json file in destination path
    this.fs.extendJSON(this.destinationPath("package.json"), pkgJson);
    this.npmInstall(["vue"], { "save-dev": false });
    this.npmInstall(
      [
        "webpack",
        "vue-loader",
        "vue-template-compiler",
        "vue-style-loader",
        "css-loader",
        "webpack-cli",
        "copy-webpack-plugin",
        "babel-loader",
        "@babel/core",
        "@babel/preset-env",
        "@babel/register",
        "@istanbuljs/nyc-config-babel",
        "babel-plugin-istanbul",
        "mocha",
        "nyc",
      ],
      { "save-dev": true }
    );
  }

  copyFiles() {
    this.fs.copyTpl(
      this.templatePath("../../test/simple.js"),
      this.destinationPath("test/simple.js")
    );
    this.fs.copyTpl(
      this.templatePath("../../../.babelrc"),
      this.destinationPath(".babelrc")
    );
    this.fs.copyTpl(
      this.templatePath("../../../.nycrc"),
      this.destinationPath(".nycrc")
    );
    this.fs.copyTpl(
      this.templatePath("index.html"),
      this.destinationPath("src/index.html"),
      { title: this.answers.title }
    );

    this.fs.copyTpl(
      this.templatePath("HelloWord.vue"),
      this.destinationPath("src/HelloWord.vue")
    );

    this.fs.copyTpl(
      this.templatePath("webpack.config.js"),
      this.destinationPath("webpack.config.js")
    );

    this.fs.copyTpl(
      this.templatePath("main.js"),
      this.destinationPath("src/main.js")
    );
  }
};
