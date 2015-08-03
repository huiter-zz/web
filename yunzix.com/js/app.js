'use strict';

(function(angular, Sensoro, undefined){
  var app = angular.module('wechat-platform', ['ui.router',  'oc.lazyLoad', 'ngCookies', 'ui.bootstrap', 'i18n']);
  Sensoro.app = app;

  /**
  * 路由逻辑
  *
  *
  */

  app.constant('RouteManifest', {
    // 第一层
    'index': { // 初始页面，无内容，跳转
      url: '/',
      templateUrl: 'tpl/loading.html',
      controller: 'IndexCtrl',
      resolve: {
        deps: ['$ocLazyLoad',
          function( $ocLazyLoad ){
            return $ocLazyLoad.load(['js/index.js']);
          }
        ]
      }
    },
    'home' : { // 首页
      url: '/home',
      templateUrl: 'tpl/home.html',
      controller: 'HomeCtrl',
      resolve: {
        deps: ['$ocLazyLoad',
          function( $ocLazyLoad ){
            return $ocLazyLoad.load(['js/home.js', 'js/lib/particles.min.js']);
          }
        ]
      }
    },  
    'login' : { // 登陆页面
      url: '/login',
      templateUrl: 'tpl/login.html',
      controller: 'LoginCtrl',
      resolve: {
        deps: ['$ocLazyLoad',
          function( $ocLazyLoad ){
            return $ocLazyLoad.load(['js/login.js']);
          }
        ]
      }
    },
    'cloud': {
      url: '/cloud',
      templateUrl: 'tpl/cloud.html',
      controller: 'CloudCtrl',
      resolve: {
        deps: ['$ocLazyLoad',
          function( $ocLazyLoad ){
            return $ocLazyLoad.load(['js/cloud.js']);
          }
        ]
      }      
    },
    // 第二层
    'cloud.agent': {
      url: '/agent',
      templateUrl: 'tpl/agent.html',
      controller: 'AgentCtrl',
      resolve: {
        deps: ['$ocLazyLoad',
          function( $ocLazyLoad ){
            return $ocLazyLoad.load(['js/agent.js']);
          }
        ]
      }      
    },
    'cloud.store': {
      url: '/store',
      templateUrl: 'tpl/store.html',
      controller: 'StoreCtrl',
      resolve: {
        deps: ['$ocLazyLoad',
          function( $ocLazyLoad ){
            return $ocLazyLoad.load(['js/store.js']);
          }
        ]
      }      
    },
    'cloud.dashboard': {
      url: '/dashboard',
      templateUrl: 'tpl/dashboard.html',
      controller: 'DashboardCtrl',
      resolve: {
        deps: ['$ocLazyLoad',
          function( $ocLazyLoad ){
            return $ocLazyLoad.load(['js/dashboard.js']);
          }
        ]
      }      
    },
    'cloud.appstore': {
      url: '/appstore',
      templateUrl: 'tpl/appstore.html',
      controller: 'AppStoreCtrl',
      resolve: {
        deps: ['$ocLazyLoad',
          function( $ocLazyLoad ){
            return $ocLazyLoad.load(['js/appstore.js']);
          }
        ]
      }      
    },
    'cloud.profile': {
      url: '/profile',
      templateUrl: 'tpl/profile.html',
      controller: 'ProfileCtrl',
      resolve: {
        deps: ['$ocLazyLoad',
          function( $ocLazyLoad ){
            return $ocLazyLoad.load(['js/profile.js']);
          }
        ]
      }      
    },
    'cloud.wechat': {
      url: '/wechat',
      templateUrl: 'tpl/wechat.html',
      controller: 'WechatCtrl',
      resolve: {
        deps: ['$ocLazyLoad',
          function( $ocLazyLoad ){
            return $ocLazyLoad.load(['js/wechat.js']);
          }
        ]
      }      
    },
    'cloud.document': {
      url: '/document',
      templateUrl: 'tpl/document.html',
      controller: 'DocumentCtrl',
      resolve: {
        deps: ['$ocLazyLoad',
          function( $ocLazyLoad ){
            return $ocLazyLoad.load(['js/document.js']);
          }
        ]
      }      
    },
    // 第三层
    'cloud.appstore.face': {
      url: '/appstore/face',
      parent: 'cloud',
      templateUrl: 'tpl/face.html',
      controller: 'FaceCtrl',
      resolve: {
        deps: ['$ocLazyLoad',
          function( $ocLazyLoad ){
            return $ocLazyLoad.load(['js/face.js']);
          }
        ]
      }      
    },
    'cloud.appstore.menu': {
      url: '/appstore/menu',
      parent: 'cloud',
      templateUrl: 'tpl/menu.html',
      controller: 'MenuCtrl',
      resolve: {
        deps: ['$ocLazyLoad',
          function( $ocLazyLoad ){
            return $ocLazyLoad.load(['js/menu.js']);
          }
        ]
      }      
    },
    'cloud.appstore.brand': {
      url: '/appstore/brand',
      parent: 'cloud',
      templateUrl: 'tpl/brand.html',
      controller: 'BrandCtrl',
      resolve: {
        deps: ['$ocLazyLoad',
          function( $ocLazyLoad ){
            return $ocLazyLoad.load(['js/brand.js']);
          }
        ]
      }      
    },
    'cloud.appstore.box': {
      url: '/appstore/box',
      parent: 'cloud',
      templateUrl: 'tpl/box.html',
      controller: 'BoxCtrl',
      resolve: {
        deps: ['$ocLazyLoad',
          function( $ocLazyLoad ){
            return $ocLazyLoad.load(['js/box.js']);
          }
        ]
      }      
    },
    'cloud.appstore.shake': {
      url: '/appstore/shake',
      parent: 'cloud',
      templateUrl: 'tpl/shake.html',
      controller: 'ShakeCtrl',
      resolve: {
        deps: ['$ocLazyLoad',
          function( $ocLazyLoad ){
            return $ocLazyLoad.load(['js/shake.js']);
          }
        ]
      }      
    },
    //创建
    'cloud.appstore.face.create': {
      url: '/appstore/face/create',
      parent: 'cloud',
      templateUrl: 'tpl/face_create.html',
      controller: 'ShakeCtrl',
      resolve: {
        deps: ['$ocLazyLoad',
          function( $ocLazyLoad ){
            return $ocLazyLoad.load(['js/face_create.js']);
          }
        ]
      }      
    },
  });

  /**
    * 路由配置
    * authentication 为 true 则需要验证是否以登陆
    */
  app.config(function($stateProvider, $urlRouterProvider, $locationProvider, RouteManifest) {
    $urlRouterProvider.otherwise('/login');
    Object.keys(RouteManifest).forEach(function(path) {
      if (RouteManifest[path].authentication) {
        RouteManifest[path].resolve = angular.extend(RouteManifest[path].resolve || {}, {
          user: function(User) {
            return User.ensureLogin(RouteManifest[path].authentication);
          }
        });
      }
      $stateProvider.state(path, RouteManifest[path]);
    });
    $locationProvider.html5Mode(true);
  });

  app.run(function($rootScope, $location) {
    /**
      * 监听跳转到登陆页面事件
      */
    $rootScope.$on('event:auth-loginRequired', function() {
      $location.path('/login');
    });

  });



})(angular, Sensoro);

