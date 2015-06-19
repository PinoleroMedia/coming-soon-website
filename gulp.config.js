module.exports = function () {
    var client = './';
    var sourceDirectory = 'source/';
    var indexHtml = 'index.html';

    var config = {

        indexHtml: indexHtml,
        
        sourceDirectory: sourceDirectory,

        /* The base template here anything you install with bower will be injected
         * with wiredep
         */
        index: sourceDirectory + indexHtml,

        /* Include or exlude here all the js that you want to be 
         * compressed and injected into you base.html
         */
        js: [
            sourceDirectory + 'js/**/*.js',
        ],

       

        /* Include or exlude here all the css that you want to be 
        * compressed and injected into you base.html
        */
        css: [
             sourceDirectory + 'css/**/*.css'
        ],

        /* Include or exlude here the fonts that you need 
        *  copied to your build directory eg: font awesome
        */
      

        /* This is where your compressed files will be 
         *  created, some people prefer to call this 'dist'
         */
        build: 'build/',

        /*Include here any other image patter that you want to be optimized
            or add a negate match to exclude 
        */
        images: [
             sourceDirectory + 'images/**/*.*/'
        ],


        /* 
         * These are the settings for you bower configuration
         */
        bower: {
            json: require('./bower.json'),
            directory: sourceDirectory + 'lib/',
            //ignorePath: '../static/',
           
            //exclude: [ ],
        },
        /* 
        * These are the settings for you inject css
        */
        injectCssOptions: {
            //ignorePath: '/static/',
        },

        /* 
       * These are the settings for you inject css
       */
        injectJsOptions: {
            //ignorePath: '/static/',
        }
    };

    config.getWiredepDefaulOptions = function () {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            //ignorePath: config.bower.ignorePath,
            //fileTypes: config.bower.fileTypes,
            //exclude: config.bower.exclude,
        };
        return options;
    };

    config.getInjectDefaultCssOptions = function () {
        var options = {
            ignorePath: config.injectCssOptions.ignorePath,
            transform: config.injectCssOptions.transform,
        };
        return options;
    };

    config.getInjectDefaultJsOptions = function () {
        var options = {
            ignorePath: config.injectJsOptions.ignorePath,
            transform: config.injectJsOptions.transform,
        };
        return options;
    };


    return config;
}