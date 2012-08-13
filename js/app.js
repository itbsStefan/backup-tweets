$(function($) {

  'use strict';

  var fetchButton = $('form button');
  var screenName  = $('form input');
  var progressBar = $('.progress');

  function enableForm() {

    fetchButton.removeAttr('disabled').addClass('disabled');
    screenName.removeAttr('disabled').addClass('disabled');
    progressBar.addClass('hidden');
  }

  function disableForm() {

    fetchButton.attr('disabled', '').removeClass('disabled');
    screenName.attr('disabled', '').removeClass('disabled');
    progressBar.removeClass('hidden');
  }

  function fetchSucceded() {

    enableForm();
    console.log(arguments);
  }

  function fetchFailed() {
    enableForm();
  }

  var twitterBaseUrl = 'https://api.twitter.com/1/statuses/user_timeline.json?trim_user=true&screen_name=';
  function fetchTweets() {

    disableForm();

    var uid = screenName.val();

    $.ajax({
      'url': twitterBaseUrl + uid,
      'dataType': 'jsonp',
      'success': fetchSucceded,
      'error': fetchFailed
    });
  }

  fetchButton.click(fetchTweets);

});