
angular.module('i18n', ['pascalprecht.translate'])
.config(['$translateProvider', function ($translateProvider) {
  console.log('111', $translateProvider);
  $translateProvider.useLocalStorage();
  var lang = navigator.language;
  if(!lang) lang = navigator.browserLanguage || 'en';
  lang = lang.toLowerCase();
  lang = (lang.indexOf('zh') !== -1 || lang.indexOf('zh-cn') !== -1) ? 'zh-cn' : 'en';
  // add translation table
  $translateProvider
  .translations('zh-cn', Sensoro.zh_cn)
  .translations('zh-tw', Sensoro.zh_tw)
  .translations('en', Sensoro.en)
  .preferredLanguage(lang);
  // remember language
}]).controller('LangCtrl', function ($scope, $translate, $filter) {
  $scope.lang = $translate.use();
  var _lang = $scope.lang ? $scope.lang.toUpperCase() : 'ZH-CN';
  $scope.langText = $filter('translate')('topbar.'+_lang);
  $scope.changeLanguage = function (lang) {
    lang = lang || 'zh-cn';
    $scope.lang = lang;
    _lang = $scope.lang ? $scope.lang.toUpperCase() : 'ZH-CN';
    $scope.langText = $filter('translate')('topbar.'+_lang);
    $translate.use(lang);
  };
}).run(function($translate){
  var lang = navigator.language;
  if(!lang) lang = navigator.browserLanguage || 'en';
  lang = lang.toLowerCase();
  lang = $translate.use() ? $translate.use() : lang;
  lang = (lang.indexOf('zh') !== -1 || lang.indexOf('zh-cn') !== -1) ? 'zh-cn' : 'en';
  $translate.use(lang);
});
