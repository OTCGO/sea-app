/**
 * Check out https://googlechromelabs.github.io/sw-toolbox/ for
 * more info on how to use sw-toolbox to custom configure your service worker.
 */


'use strict';
importScripts('./build/sw-toolbox.js');

// TODO: set true
self.toolbox.debug = true


self.toolbox.options.cache = {
  name: 'ionic-cache'
};

// pre-cache our key assets
self.toolbox.precache(
  [
    "./assets/i18n/en.json",
    "./assets/i18n/zh.json",
    './build/main.js',
    './build/vendor.js',
    './build/main.css',
    './build/polyfills.js',
    "./assets/imgs/bg-discover.jpg",
    "./assets/imgs/bg-manage-wallet.png",
    "./assets/imgs/bg-possessions.png",
    "./assets/imgs/bg-profile.png",
    "./assets/imgs/claims_loader.svg",
    "./assets/imgs/icon-backup-wallet_success.svg",
    "./assets/imgs/icon-contacts_edit.svg",
    "./assets/imgs/icon-contacts_remove.svg",
    "./assets/imgs/icon-login_file.svg",
    "./assets/imgs/icon-login_WIF.svg",
    "./assets/imgs/icon-possessions_hide-zero-on.png",
    "./assets/imgs/icon-possessions_hide-zero.png",
    "./assets/imgs/icon-profile_contacts.svg",
    "./assets/imgs/icon-profile_helpcentre.svg",
    "./assets/imgs/icon-profile_manage-wallet.png",
    "./assets/imgs/icon-profile_notification.svg",
    "./assets/imgs/icon-profile_setting.svg",
    "./assets/imgs/icon-profile_tx-history.png",
    "./assets/imgs/icon-qrcode-avatar.png",
    "./assets/imgs/icon-send-modal_contact.svg",
    "./assets/imgs/icon-send-modal_scan.svg",
    "./assets/imgs/icon-tabs_balances_off.svg",
    "./assets/imgs/icon-tabs_balances_on.svg",
    "./assets/imgs/icon-tabs_discover_off.svg",
    "./assets/imgs/icon-tabs_discover_on.svg",
    "./assets/imgs/icon-tabs_markets_off.svg",
    "./assets/imgs/icon-tabs_markets_on.svg",
    "./assets/imgs/icon-tabs_profile_off.svg",
    "./assets/imgs/icon-tabs_profile_on.svg",
    "./assets/imgs/logo--white.png",
    "./assets/imgs/logo.png",
    "./assets/imgs/whitebg.svg",
    'index.html',
    'manifest.json'
  ]
);

// dynamically cache any other local assets
self.toolbox.router.any('/*', self.toolbox.fastest);

// for any other requests go to the network, cache,
// and then only use that cached resource if your user goes offline
self.toolbox.router.default = self.toolbox.networkFirst;
