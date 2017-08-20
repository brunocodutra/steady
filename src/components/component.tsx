import * as React from 'react';

import {Model, Models} from 'model';

type Prop = {
  readonly model: Model,
};

export default class Component extends React.Component< Prop, {} > {
  public render(): JSX.Element {
    const UnhandledModel = (_: never): never => {
      throw new Error('UnhandledModel');
    };

    switch (this.props.model.kind) {
      case Models.SERIES:
        return (
          <span className='series tile'>
            {this.props.model.components.map((model, i) => <Component model={model} key={i}/>)}
          </span>
        );

      default:
        return UnhandledModel(this.props.model.kind);
    }
  }
}
