function SdkCtrl($scope, $enplug) {

    $scope.assets = []; //Setting assets to a sane default, assets come as an array of objects

    $scope.account = null; //Setting a sane default, account comes an object.

    $scope.showAdvanced = false; //Sane default for the show advanced value, used to hide/show form fields.


    /**
     * Initializing the object with known good values.
     * It is not necessary to do this, as the ng-model in the html will create these values as applicable.
     */
    $scope.page = {
        Value: {
            ShowContent: 'url', // Show Content is used to hide/show the Url or Html form field based on the selection.
            Url: '', // The Url the web page back-end uses to display the content.
            Html: null, // If applicable, used to show custom HTML. Cannot be used in conjunction with the Url.
            ShowMobile: false, //If applicable, used to display the mobile version of the URL passed in.
            ShowDelay: null, //Custom delay between displaying the page after it's been loaded.
            RefreshInterval: null, // Custom refresh interval rate in X seconds.
            AllowJavascript: true, // Set to true by default, allows Javascript to be executed on the page.
            Username: '', // Username option, would need to write script passing in credientials.
            Password: '', // Password option, would need to write script passing in credientials.
            Token: '', // Token option, would need to wrtie script passing in credientials.
            JavascriptOnload: '' // Custom JS to be executed once the page loads, can be used to log into authenticated pages.
        }
    };

    /**
     * Error handling function, displays the error returned from any call
     * @param error
     */
    function handleError(error) {
        window.alert('There was an error! ' + error);
    }

    /**
     * Toggles the advanced options, flips value for ng-show/hide within the form
     */
    $scope.toggleAdvanced = function() {
        $scope.showAdvanced = !$scope.showAdvanced;
    };

    /**
     * Loads the account information. $scope value set to it's response so the object's properties are available in the HTML
     */
    $scope.getAccount = function() {
        $enplug.getAccount(function(account) {
            console.log('Loaded account:', account);
            $scope.account = account;
        }, handleError);
    };

    /**
     * Loads the asssets for the application. Since this is a webpage extension, we only want to create a single 'page' asset.
     * Think of this page as the web-page(url, refresh rate, etc) you are passing to be displayed. You do not want to create a new page everytime but
     * rather you want to update the existing page.
     */
    $scope.getAssets = function() {
        $enplug.getAssets(function(assets) {
            console.log('Loaded assets:', assets);
            if (assets.length) {
                $scope.page = assets[0];
                $scope.page.Value = assets[0].Value;
            }
        }, handleError);
    };

    /**
     * Removes the asset completely. Used if the user wants to clear all data rather than updating existing asset.
     * @param assetId
     */
    $scope.removeAsset = function(assetId) {
        $enplug.removeAsset(assetId, function() {
            console.log('Removed asset.');
            $scope.configured = true;
            $scope.getAssets();
        }, handleError)
    };

    /**
     * If page exists, updates existing page otherwise creates new page.
     */
    $scope.save = function() {
        if ($scope.page && $scope.page.Id) {
            $enplug.updateAsset($scope.page.Id, $scope.page.Value);
        } else {
            $enplug.createAsset('WebURL', $scope.page.Value);
            $scope.configured = true;
        }
    };

    /**
     * Initialize by loading assets and account for immediate use in the page
     */
    $scope.getAccount();
    $scope.getAssets();
};


angular
    .module('eventsBoard')
    .controller('SdkCtrl', SdkCtrl)
