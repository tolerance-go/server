// This file is created by egg-ts-helper@1.30.4
// Do not modify this file!!!!!!!!!

import 'egg';
import ExtendContext = require('../../../app/extend/context');
type ExtendContextType = typeof ExtendContext;
declare module 'egg' {
  interface Context extends ExtendContextType { }
}