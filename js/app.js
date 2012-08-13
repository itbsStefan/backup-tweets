$(function($) {

  'use strict';

  var formElements = $('input,button', $('form'));
  var tweetFetchButton = $('form button');
  var screenNameInput = $('form input.name');
  var includeRTsBox = $('form input.includeRTs');
  var progressBar = $('.progress');

  function enableForm() {

    formElements.removeAttr('disabled').removeClass('disabled');
    progressBar.addClass('hidden');
  }

  function disableForm() {

    formElements.attr('disabled', '').addClass('disabled');
    progressBar.removeClass('hidden');
  }

  function fetchSucceded() {

    enableForm();
    console.log(arguments);
  }

  function fetchFailed() {
    enableForm();
  }

  var twitterBaseUrl = 'https://api.twitter.com/1/statuses/user_timeline.json?trim_user=true&count=50&screen_name=';
  var screenName;
  function fetchTweets(page) {

    disableForm();
    page = page || 0;
    screenName = screenNameInput.val();

    var includeRTs = !!includeRTsBox.attr('checked');

    $.ajax({
      'url': twitterBaseUrl + screenName + '&page=' + page + '&include_rts=' + includeRTs,
      'dataType': 'jsonp',
      'success': fetchSucceded,
      'error': fetchFailed
    });
  }

  tweetFetchButton.click(fetchTweets);

  screenNameInput.focus();

});