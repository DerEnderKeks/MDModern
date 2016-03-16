import win from 'window';
import $ from 'jQuery';
import mdm from './mdm.js';

var $cover = $("#fade-in-cover")

$(function() {
  
  // set an additional timeout because MDM keeps us covered for a little while
  win.setTimeout(function() {
    
    // using css transition instead of $.fn.fadeOut
    $cover.addClass('ready');
    
    win.setTimeout(function() {
      $cover.remove();
    }, 1000);
    
  }, 1500);
  
});