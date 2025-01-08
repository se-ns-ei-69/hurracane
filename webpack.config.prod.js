const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'mailer.php', to: 'mailer.php' },
        { from: 'img', to: 'img' },
        { from: 'locales', to: 'locales' },
        { from: 'style.css', to: 'style.css' },
        { from: 'js/vendor', to: 'js/vendor' },
        { from: 'js/form.js', to: 'js/form.js' },
        { from: 'icon.svg', to: 'icon.svg' },
        { from: 'favicon.ico', to: 'favicon.ico' },
        { from: 'robots.txt', to: 'robots.txt' },
        { from: 'icon.png', to: 'icon.png' },
        { from: 'index.html', to: 'index.html' },
        { from: '404.html', to: '404.html' },
        { from: 'site.webmanifest', to: 'site.webmanifest' },
      ],
    }),
  ],
});
