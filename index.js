// ==UserScript==
// @name        Search helpers for last.fm now page
// @namespace   lastfm
// @include     http://www.lastfm.ru/user/*/now
// @version     1.1
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.js
// ==/UserScript==


var needUpdating = true;

function getYandexMusicLink() {
  return 'http://music.yandex.ru/#!/search?text=' + encodeURI($('.artist-name a').text().trim() + ' - ' + $('.track-name').text().trim());
}

function getVkLink() {
  return 'https://vk.com/search?c[section]=audio&c[q]=' + encodeURI($('.artist-name a').text().trim() + ' - ' + $('.track-name').text().trim());
}

function updateLinksWrapperContent() {
  if ($('.external-find-links').length === 0) {
    $('.track-meta').prepend('<div style="padding-bottom: 10px" class="external-find-links"></div>');
    $('.external-find-links').append('<div><a target="_blank" href="'+getYandexMusicLink()+'">Искать на Яндекс.Музыке</a></div>');
    $('.external-find-links').append('<div><a target="_blank" href="'+getVkLink()+'">Искать на Vk.com</a></div>');
  }
}

setInterval(function () {
  updateLinksWrapperContent();
  needUpdating = false;
}, 1000);

$('.page-wrapper').bind("DOMSubtreeModified", function() {
  needUpdating = true;
});

updateLinksWrapperContent();
