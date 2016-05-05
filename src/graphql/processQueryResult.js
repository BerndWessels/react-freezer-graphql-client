/**
 * Manapaho (https://github.com/manapaho/)
 *
 * Copyright © 2016 Manapaho. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/**
 * This will process the given query result to merge it into a given entity cache.
 * @param schema The query language schema.
 * @param entities The entity cache to receive the resulting entities.
 * @param jsonQueryResult The JSON query tree to be processed.
 * @param mergeCallback An optional callback to control the way the results are merged back into the entity cache.
 */
export default function (schema, entities, jsonQueryResult, mergeCallback) {
  return processQueryResultNode(schema, entities, jsonQueryResult, schema.Query, null, mergeCallback);
}

function processQueryResultNode(schema, entities, node, nodeType, entityType, mergeCallback) {
  for (let propName in node) {
    let prop = node[propName];
    let propType = nodeType[propName];
    if (propType && propType.type && prop !== null) {
      if (Array.isArray(prop)) {
        let propItemIds = [];
        prop.forEach((propItem) => {
          propItemIds.push(processQueryResultNode(schema, entities, propItem, schema[propType.type], propType.type, mergeCallback));
        });
        node[propName] = propItemIds;
      } else {
        node[propName] = processQueryResultNode(schema, entities, prop, schema[propType.type], propType.type, mergeCallback);
      }
    }
  }
  if (entityType) {
    if (!entities.hasOwnProperty(entityType)) {
      entities[entityType] = {};
    }
    if (mergeCallback && mergeCallback(entities, entityType, node) !== undefined) { // TODO better "!" instead of "!== undefined" ?
      return node.id;
    }
    entities[entityType][node.id] =
      entities[entityType].hasOwnProperty(node.id) ? Object.assign({}, entities[entityType][node.id], node) : node;
    return node.id;
  } else {
    return node;
  }
}
