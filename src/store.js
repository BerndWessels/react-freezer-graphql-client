/**
 * Manapaho (https://github.com/manapaho/)
 *
 * Copyright © 2016 Manapaho. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import Freezer from 'freezer-js';
import app from './app/store';
import schema from './graphql/schema.client';
import processQueryResult from './graphql/processQueryResult';

/**
 * The application's store.
 */
const store = new Freezer({
  locale: 'en',
  app: app,
  // Entity cache is not pluralized to better reflect types.
  entities: {
    // TODO entities type caches get created if they don't exist. maybe no need to create them here?
    User: {},
    Post: {},
    PostConnection: {},
    Comment: {}
  }
}, {
  // Enable mutability to allow entity updates.
  mutable: true
  // Maybe enable live mode, not sure if necessary.
  // live: true
});

export default store;

/**
 * Entity Cache Functionality.
 */

/**
 * Get the entity with the given type and id from the entity cache.
 * @param type
 * @param id
 */
export function getEntity(type, id) {
  const state = store.get();
  return state.entities[type][id];
}

/**
 * Get the entities with the given type and ids from the entity cache.
 * @param type
 * @param ids
 */
export function getEntities(type, ids) {
  if (!Array.isArray(ids)) {
    return [];
  }
  const state = store.get();
  var entities = [];
  ids.forEach(id => {
    if (state.entities[type].hasOwnProperty(id)) {
      entities.push(state.entities[type][id]);
    }
  });
  return entities;
}

/**
 * Get the entities from the connection with the given type and id.
 * @param connectionType
 * @param connectionId
 */
export function getEntitiesFromConnection(connectionType, connectionId) {
  if (!connectionId) {
    return [];
  }
  var entities = [];
  var nodeType = schema[connectionType].nodes.type;
  const state = store.get();
  state.entities[connectionType][connectionId].nodes.forEach((nodeId) => {
    if (state.entities[nodeType].hasOwnProperty(nodeId)) {
      entities.push(state.entities[nodeType][nodeId]);
    }
  });
  return entities;
}

/**
 * Get the connection with the given type and id from the entity cache and include its entities.
 * @param connectionType
 * @param connectionId
 */
export function getConnectionWithEntities(connectionType, connectionId) {
  if (!connectionId) {
    return [];
  }
  var entities = [];
  var nodeType = schema[connectionType].nodes.type;
  const state = store.get();
  state.entities[connectionType][connectionId].nodes.forEach((nodeId) => {
    if (state.entities[nodeType].hasOwnProperty(nodeId)) {
      entities.push(state.entities[nodeType][nodeId]);
    }
  });
  return {...state.entities[connectionType][connectionId], nodes: entities};
}

/**
 * Insert/Update the given entity in the entity cache.
 * @param type
 * @param updatedEntity
 */
export function setEntity(type, updatedEntity) {
  const state = store.get();
  let entities = state.entities[type].transact();
  entities[updatedEntity.id] = updatedEntity;
  state.entities[type].run();
}

/**
 * Insert/Update the given entities in the entity cache.
 * @param type
 * @param updatedEntities
 */
export function setEntities(type, updatedEntities) {
  const state = store.get();
  let entities = state.entities[type].transact();
  updatedEntities.forEach(updatedEntity => {
    entities[updatedEntity.id] = updatedEntity;
  });
  state.entities[type].run();
}

/**
 * This helper simplifies the creation of reactions.
 * @param exports
 * @param name
 * @param handler
 * @param trigger
 */
export function createReaction(exports, name, handler, trigger) {
  store.on(name, handler);
  exports[name.replace(/:/g, '_')] = trigger ? trigger : (...args) => {
    store.trigger(name, ...args);
  };
}

/**
 * Send the ql query to a given endpoint and fetchQuery the results.
 * @param query The query language query string.
 * @param mergeCallback An optional callback to control the way the results are merged back into the entity cache.
 */
export function fetchQuery(query, mergeCallback) {
  // TODO get endpoint and headers from a config.
  return fetch('http://127.0.0.1:8088/graphql', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: 'Client-ID dc708f3823b7756',
      'Content-type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({query: `{${query}}`})
  }).then(response => {
    return response.json().then(result => {
      let state = store.get();
      let entities = state.entities.transact();
      let queryValue = processQueryResult(schema, entities, result.data, mergeCallback);
      state.entities.run();
      return queryValue;
    });
  });
}
