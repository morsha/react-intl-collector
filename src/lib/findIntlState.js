import React from 'react';
import { renderToString } from 'react-dom/server';

function createWidgetsCollector(accumulator) {
  return (descriptor) => {
    if (!~accumulator.indexOf(descriptor)) {
      accumulator.push(descriptor);
    }
  };
}

export function findIntlState(App, props) {
  const intlSet = [];

  renderToString(React.createElement(App, {
    ...props,
    intlCollector: createWidgetsCollector(intlSet),
  }));

  return intlSet;
}
