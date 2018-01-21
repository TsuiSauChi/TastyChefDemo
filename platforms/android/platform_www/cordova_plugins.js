cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/ai.api.apiaiplugin/www/lib/q.js",
        "id": "ai.api.apiaiplugin.Q",
        "runs": true
    },
    {
        "file": "plugins/ai.api.apiaiplugin/www/ApiAIPlugin.js",
        "id": "ai.api.apiaiplugin.ApiAIPlugin",
        "clobbers": [
            "window.ApiAIPlugin"
        ]
    },
    {
        "file": "plugins/ai.api.apiaiplugin/www/ApiAIPromises.js",
        "id": "ai.api.apiaiplugin.ApiAIPromises",
        "clobbers": [
            "window.ApiAIPromises"
        ]
    },
    {
        "file": "plugins/card.io.cordova.mobilesdk/www/cdv-plugin-card-io.js",
        "id": "card.io.cordova.mobilesdk.CardIO",
        "clobbers": [
            "CardIO"
        ]
    },
    {
        "file": "plugins/com.paypal.cordova.mobilesdk/www/cdv-plugin-paypal-mobile-sdk.js",
        "id": "com.paypal.cordova.mobilesdk.PayPalMobile",
        "clobbers": [
            "PayPalMobile"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{}
// BOTTOM OF METADATA
});