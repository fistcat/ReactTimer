var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var Controls = require('Controls');

describe("Controls", ()=>{
  it('should exist',()=>{
    expect(Controls).toExist();
  });

  describe('render', ()=>{
    it('should render pause when started', ()=>{
      //test if Pause button exsit
      var controls = TestUtils.renderIntoDocument(<Controls countdownStatus="started"/>);
      var $el = $(ReactDOM.findDOMNode(controls));
      //button:contains(arg) find button with 'arg' value assgin in the tag
      var $pauseButton = $el.find('button:contains(Pause)');
      //jquery length return all the finding selection. 1 mean only one button with Pause been found
      expect ($pauseButton.length).toBe(1);
    });
    // test if start button exist
    it('should render start when paused', ()=>{
      var controls = TestUtils.renderIntoDocument(<Controls countdownStatus="paused"/>);
      var $el = $(ReactDOM.findDOMNode(controls));

      var $startbutton = $el.find('button:contains(Start)');

      expect($startbutton.length).toBe(1);
    })


  });

});
