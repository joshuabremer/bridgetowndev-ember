var http = require("http");
var fs = require("fs");
var easyimg = require("easyimage");
var smushit = require("node-smushit");
var util = require( "./utilities" );
var festivalData = require( "./festival-data" );
var wrench = require('wrench');
var request = require('request');

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    if (err) {
      console.log(err.red);
    }
    // console.log('content-type:', res.headers['content-type']);
    // console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};


var ObjectBuilder = require( "./object_builder" );

var ShowBuilder = ObjectBuilder.extend({
  TMP_PATH: festivalData.tmpShowsPath,
  FIXTURES_PATH: "./app/fixtures/show.js",

  normalizeData: function() {
    var showObj = festivalData.getShowObject();
    for (var key in showObj) {
      showObj[key].id = showObj[key].SubmittedId;
      showObj[key].pageUrl = showObj[key].id + "-" + util.convertToSlug(showObj[key].Name);
    }
    fs.writeFileSync(this.TMP_PATH, JSON.stringify(showObj, null, " "), "utf8");
  },

  addRelationships: function() {
    var showObj = festivalData.getShowObject();
    var eventObj = festivalData.getEventData();

    for (var key in showObj) {
      showObj[key].events = festivalData.getEventsForShow(showObj[key].id)
    }
    fs.writeFileSync( this.TMP_PATH, JSON.stringify(showObj, null, " "), "utf8");
  },

  writeToFixtureFile: function() {
    fs.writeFileSync( this.FIXTURES_PATH ,"/*jshint -W100 */\nexport default ","utf8");
    fs.appendFileSync( this.FIXTURES_PATH ,festivalData.getShowData(),{encoding:"utf8"});
    fs.appendFileSync( this.FIXTURES_PATH ,";");
  },

  createStaticPages: function() {
    // var showObj = festivalData.getShowObject();
    // var rootPath = "./show/";
    // wrench.rmdirSyncRecursive( "./show", true );
    // fs.mkdirSync( "./show" );

    // for ( var key in showObj ) {
    //   var fileName = util.convertToSlug( showObj[key].Name );
    //   var dirPath = rootPath + showObj[key].pageUrl;
    //   var filePath = dirPath + "/index.html";

    //   fs.mkdirSync( dirPath );
    //   fs.openSync( filePath, "w");

    //   fs.appendFileSync( filePath, "---\n");
    //   fs.appendFileSync( filePath, "layout: page\n");
    //   fs.appendFileSync( filePath, "title: \"" + showObj[key].Name + "\"\n");
    //   fs.appendFileSync( filePath, "category: show \n");
    //   fs.appendFileSync( filePath, "featuredimage: \"/img/show-images/show-" + util.cleanStr(showObj[key].Name) + "-300x300.jpg\"\n");
    //   fs.appendFileSync( filePath, "---\n\n");

    //   fs.appendFileSync( filePath, util.htmlToText(showObj[key].Bio));
    // }
  },

  createHeadshots: function() {
    var showObj = festivalData.getShowObject();

    for ( var key in showObj ) {
      var item = showObj[key];
      this.buildImageFromURL ( item.Name, item.PhotoUrl, "show" )
    }
     // curl -z tmp/aaronweaver.jpg http://localhost:4000/img/show-images/show-aaronweaver-300x300.jpg -o tmp/aaronweaver.jpg
  },

  buildImageFromURL: function ( name, url, prefix ) {
    var _this = this;
    var filename = url.replace(/^.*[\\\/]/, "");

    var _this = this;
    var filename = url.replace(/^.*[\\\/]/, "");
    var file = fs.createWriteStream("tmp/" + filename);

    var request = http.get(url, function(response) {
      console.log("Created: " + "tmp/" + filename);
      response.pipe(file);
      response.on("end", function () {
        _this.buildThumbnail("tmp/" + filename, "public/img/show-images/" + prefix + "-" + util.cleanStr(name) + "-300x300.jpg");
      });
    });
    request.on("error", function(e) {
      var errMsg = "Error downloading image: " + e.message;
      console.log(errMsg.red);
      // console.log("Url: " + url)
      setTimeout(function() {
        _this.buildImageFromURL.call(_this, name, url, prefix )
      },1000 * Math.random())

    });
  },

  buildThumbnail: function ( imgSrc, imgDest, fill ) {
    console.log( imgSrc, imgDest, fill)
    fill = fill || false;
    easyimg.convert({ src: imgSrc, dst: imgDest, quality: 80 }, function (file) {
      easyimg.thumbnail(
        {
          src: imgDest,
          dst: imgDest,
          width: 300,
          height: 300,
          x: 0,
          y: 0,
          fill: fill
        },
        function(err, image) {
         if (err) {
          var errMsg = "Error resizing: " + imgDest;
          console.log(errMsg.red);
          return;
         }
         //smushit.smushit(imgDest);
         //console.log("Resized and cropped: " + image.width + " x " + image.height + " | " + imgDest);
         // fs.unlink(imgSrc, function() {
         //  console.log("Deleted tmp file: " + imgSrc);
         // });
      });
    });
  }
});

module.exports = ShowBuilder;



