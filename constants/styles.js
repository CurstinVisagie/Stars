'use strict';

var React = require('react-native');
const { default: Colors } = require('./Colors');

var { StyleSheet } = React;

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary
  },
  containerCenter: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  },
  pageTitle: {
    fontSize: 20,
    margin: 10,
    fontFamily: "comfortaa"
  },
  row: {
    flexDirection: 'row',
    alignItems: "center"
  }
});