const { override, addLessLoader, fixBabelImports } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),
  fixBabelImports('formik-antd', {
    libraryName: 'formik-antd',
    libraryDirectory: 'es',
    style: 'css',
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@font-family': 'Open Sans', '@border-radius-base': '4px' },
  })
);