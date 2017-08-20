import * as React from 'react';
import {connect} from 'react-redux';

import {Model, Models} from 'model';
import {State} from 'reducer';

type PropsBase = {
  readonly id: number[],
  readonly model: Model,
};

type Props = PropsBase & {readonly active: boolean};

const mapState = ({active}: State, {id}: PropsBase) => ({
  active: JSON.stringify(active) === JSON.stringify(id),
});

const Component = connect(mapState)(
  class extends React.Component< Props, {} > {
    public render() {
      return (
        <span className={this.props.active ? 'blink' : ''}>
          {this.content()}
        </span>
      );
    }

    private content(): JSX.Element {
      const UnhandledModel = (_: never): never => {
        throw new Error('UnhandledModel');
      };

      switch (this.props.model.kind) {
        case Models.GROUND:
          return <span className='ground tile'/>;

        case Models.PLACEHOLDER:
          return <span className='placeholder tile border rounded interactive'/>;

        case Models.SERIES:
          return (
            <span className='series tile'>
              {this.props.model.components.map((model, i) => (
                <Component id={[...this.props.id, i]} model={model} key={i}/>),
              )}
            </span>
          );

        default:
          return UnhandledModel(this.props.model);
      }
    }
  },
);

export default Component;
