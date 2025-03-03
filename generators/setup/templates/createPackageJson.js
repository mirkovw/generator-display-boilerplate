module.exports = function createPackageJson({ name = 'display-temple' }) {
  return {
    name,
    version: '1.0.0',
    description: '',
    homepage: '',
    author: '',
    engines: {
      node: '>= 16',
      npm: '>= 8',
    },
    scripts: {
      dev: "dds --mode development",
      build: "dds --mode production",
      preview: 'display-upload',
    },
    license: 'ISC',
    dependencies: {
      "@mediamonks/display-dev-server": "^10.0.0",
      "@mediamonks/display-temple": "^6.2.2",
      "@mediamonks/display-upload": "^1.5.10",
      "webfontloader": "^1.6.28"
    },
  };
};
