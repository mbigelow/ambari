/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var App = require('app');
var model;

describe('App.SubSection', function () {

  beforeEach(function () {
    model = App.SubSection.createRecord();
  });

  describe('#errorsCount', function () {

    beforeEach(function () {
      model.set('configs', [
        {isValid: false},
        {isValid: true},
        {isValid: false},
        {isValid: true}
      ]);
    });

    it('should use configs.@each.isValid', function () {
      expect(model.get('errorsCount')).to.equal(2);
    });

  });

  describe('#isHiddenByFilter', function () {

    Em.A([
        {
          configs: [],
          e: false,
          m: 'Can\'t be hidden if there is no configs'
        },
        {
          configs: [{isHiddenByFilter: true}, {isHiddenByFilter: true}],
          e: true,
          m: 'All configs are hidden'
        },
        {
          configs: [{isHiddenByFilter: false}, {isHiddenByFilter: true}],
          e: false,
          m: 'Some configs are hidden'
        },
        {
          configs: [{isHiddenByFilter: false}, {isHiddenByFilter: false}],
          e: false,
          m: 'No configs are hidden'
        }
    ]).forEach(function (test) {
        it(test.m, function () {
          model.set('configs', test.configs);
          expect(model.get('isHiddenByFilter')).to.equal(test.e);
        })
      });

  });

});
