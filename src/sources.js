var sources = require('tonight-sources').sources;

sources.sourceMap = {};

sources.features.forEach(function(feat) {
  sources.sourceMap[feat.properties.id] = feat;
});

module.exports = sources;
