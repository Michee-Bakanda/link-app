const path = require('path');

module.exports = {
  output: {
    filename: 'Post.js',
  },
  module: {
    rules: [{ test: '/\.txt$/', use: 'raw-loader' }],
  },
};