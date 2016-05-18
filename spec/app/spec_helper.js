require('babel-polyfill');
require('jasmine-ajax');
require('jasmine_dom_matchers');
require('../spec_helper');
require('./react_matchers');

const factories = require.context('../factories', true, /\.js$/);
factories.keys().forEach(factories);

const Cursor = require('pui-cursor');
const {Dispatcher} = require('p-flux');
const jQuery = require('jquery');
const MockRouter = require('./support/mock_router');
const React = require('react');
const ReactDOM = require('react-dom');
const UseRouter = require('../../app/components/use_router');

let globals;

beforeAll(() => {
  globals = {
    Dispatcher,
    MockRouter,
    jQuery,
    Enqueue: {},
    React,
    ReactDOM,
    $: jQuery,
    ...require('./support/react_helper')
  };
  Object.assign(global, globals);
});

afterAll(() => {
  Object.keys(globals).forEach(key => delete global[key]);
});

beforeEach(() => {
  global.MyReactStarter = {config: {}};

  $('body').find('#root').remove().end().append('<div id="root"/>');
  Cursor.async = false;
  spyOn(require('../../app/bootstrap'), 'init');

  const Application = require('../../app/components/application');
  Application.reset();

  spyOn(Dispatcher, 'dispatch');

  MockRouter.install(UseRouter);

  jasmine.clock().install();
  jasmine.Ajax.install();
  Object.assign(XMLHttpRequest.prototype, {
    succeed(data = {}, options = {}) {
      this.respondWith(Object.assign({status: 200, responseText: data ? JSON.stringify(data) : ''}, options));
    },
    fail(data, options = {}) {
      this.respondWith(Object.assign({status: 400, responseText: JSON.stringify(data)}, options));
    }
  });
});

afterEach(() => {
  ReactDOM.unmountComponentAtNode(root);
  Dispatcher.reset();
  MockRouter.uninstall();
  jasmine.clock().uninstall();
  jasmine.Ajax.uninstall();
});
