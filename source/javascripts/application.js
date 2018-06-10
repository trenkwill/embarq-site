//= require jquery
//= require bootstrap
//= require jquery.ajaxchimp.min
//= require jquery.ajaxchimp.langs.min
//= require simulateur
//= require category_choice
//= require jquery.marquee.min
//= require embarq-js

$('.brands').marquee({
  pauseOnHover: true,
  duration: 50000,
  gap: 50,
  delayBeforeStart: 0,
  direction: 'left',
  duplicated: true,
  startVisible: true
});

$('.salaire-form').ajaxChimp({
    url: 'https://wimi-fitness.us11.list-manage.com/subscribe/post?u=9f76edc64eba56bd88ddae432&amp;id=4007bf1ef2',
    language: 'fr'
});

