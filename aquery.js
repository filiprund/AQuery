/**
*
* Author: Anton Furuholm
* An Easy and lightweight library for writing faster JavaScript
*
*/

/**
*
* Functions:
* ---
* addEvent
* removeEvent
* ajaxRequest
* getHeight
* addClass
* removeClass
* ID
* getID
* QS
* getQS
* QSA
* getQSA
* 
*
*/


/* Event Listener */

Element.prototype.addEvent = function(evnt, func) {
    if (this.addEventListener){ // W3C DOM
        this.addEventListener(evnt, func, false);
    }else if (this.attachEvent) { // IE DOM
        this.attachEvent("on" + evnt, func);
    } else { // No much to do
        this[evnt] = func;
    }
}
Element.prototype.removeEvent = function(event, func){
    if (this.removeEventListener) {                   // For all major browsers, except IE 8 and earlier
        this.removeEventListener(event, func);
    } else if (this.detachEvent) {                    // For IE 8 and earlier versions
        this.detachEvent("on"+event, func);
    }
}


/* AJAX */ 

function ajaxRequest(url, callback) {
    var XHR = null;
    if (XMLHttpRequest) {
        XHR = new XMLHttpRequest();
    } else {
        XHR = new ActiveXObject("Microsoft.XMLHTTP");
    }
    XHR.onreadystatechange = function() {
        if (XHR.readyState == 4 || XHR.readyState == "complete") {
            if (XHR.status == 200) {
                callback(XHR);
            } else {
                // alert("fel på servern");
            }

        }
    }
    XHR.open("GET", url, true);
    XHR.send(null);
}


/* Get Height */

function getHeight() {
    xHeight = null;
    if (window.screen != null)
        xHeight = window.screen.availHeight;

    if (window.innerHeight != null)
        xHeight = window.innerHeight;

    if (document.body != null)
        xHeight = document.body.clientHeight;

    return xHeight;
}


/* CLASS NAME */
Element.prototype.addClass = function( classname ) {
    var cn = this.className;
    //test for existance
    if( cn.indexOf( classname ) != -1 ) {
        return;
    }
    //add a space if the element already has class
    if( cn != '' ) {
        classname = ' '+classname;
    }
    this.className = cn+classname;
}
Element.prototype.removeClass = function(className) {
    if (!this || !this.className) {
        return false;
    }
    var regexp = new RegExp("(^|\\s)" + className + "(\\s|$)", "g");
    this.className = this.className.replace(regexp, "$2");

}


/* GET SELECTORS */

function ID(elementID)
{
  return document.getElementById(elementID);
}
Element.prototype.getID = function(id){
  this.getElementById(id);
}
function QS(element){
  return document.querySelector(element);
}
Element.prototype.getQS = function(selector){
  this.querySelector(selector);
}
function QSA(element){
  return document.querySelectorAll(element);
}
Element.prototype.getQSA = function(selector){
  this.querySelectorAll(selector);
}
function CLASS(element, elem){
  if(elem && elem != undefined){
    return elem.getElementsByClassName(element);
  }
  else{
    return document.getElementsByClassName(element);
  }   
}
Element.prototype.getCLASS = function(element){
  return this.getElementsByClassName(element);
}
function NAME(element){
    return document.getElementsByName(element);
}
Element.prototype.getNAME = function(){
  return this.getElementsByName(element);
}
function TAG(element){
    return document.getElementsByTagName(element);
}
Element.prototype.getTAG = function(){
  return this.getElementsByTagName(element);
}


/* VALIDATION */

function validateEmail(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
} 


/* PREVENT DEFAULT */
Element.prototype.stopDefault = function(){
  e = e || window.event;
  if (e.preventDefault){
    e.preventDefault();
  } 
  e.returnValue = false;  
}
function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
    e.preventDefault();
  e.returnValue = false;
}


/* STOP BEFORE CLOSING */
function confirmOnPageExit(e) 
{
    // If we haven't been passed the event get the window.event
    e = e || window.event;

    var message = 'Are you sure you want to delete this?';

    // For IE6-8 and Firefox prior to version 4
    if (e) 
    {
        e.returnValue = message;
    }

    // For Chrome, Safari, IE8+ and Opera 12+
    return message;
};


/* IS DESCENDANT */
function isDescendant(parent, child) {
     var node = child.parentNode;
     while (node != null) {
         if (node == parent) {
             return true;
         }
         node = node.parentNode;
     }
     return false;
}
