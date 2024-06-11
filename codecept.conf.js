const {setHeadlessWhen, setCommonPlugins} = require('@codeceptjs/configure');
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

/** @type {CodeceptJS.MainConfig} */
exports.config = {
    tests: './*_test.js',
    output: './output',
    helpers: {
        Mochawesome: {
            uniqueScreenshotNames: true
        },
        PrintResponse: {
            require: './printresponse_helper.js',
        },

        REST: {
            endpoint: 'https://hr-challenge.dev.tapyou.com',
            prettyPrintJson: true
        },
        JSONResponse: {}
    },
    include: {
        I: './steps_file.js'
    },
    name: 'Interactive Ventures Task'
}
