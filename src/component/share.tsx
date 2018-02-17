import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {connect} from 'react-redux';

import {unwrap} from 'lib/util';
import {serialize, State} from 'state';

import Dialog from 'component/dialog';
import Interactive from 'component/interactive';

const icon = (
  <svg viewBox='0 0 300 300'>
    <g transform='translate(-164 75)'>
      <circle cx={399} cy={145} r={40} strokeWidth={20}/>
      <circle cx={399} cy={5} r={40} strokeWidth={20}/>
      <circle cx={229} cy={75} r={40} strokeWidth={20}/>
      <path d='M359.19948 130.34494l-90.55997-39.689881m94.72612-72.825896l-94.72612 41.515778' strokeWidth={40}/>
    </g>
  </svg>
);

const Icon = () => icon;

type Props = {
  state: State,
};

type LocalState = {
  url?: string,
};

const mapState = (state: State): Props => ({
  state,
});

export default connect(mapState)(
  class extends React.PureComponent<Props, LocalState> {
    private share = unwrap(document.getElementById('navbar'), '#navbar not found');

    constructor(props: Props) {
      super(props);

      this.state = {
        url: undefined,
      };
    }

    public render() {
      return ReactDOM.createPortal(
        <Interactive action={this.onClick} className='share'>
          <Icon/>
          <Dialog
            show={!!this.state.url}
            title={'Share Link'}
            onDismiss={this.onDismiss}
          >
            <div className='input-group'>
              <input value={this.state.url || ''} className='form-control'/>
            </div>
          </Dialog>
        </Interactive>,
        this.share,
      );
    }

    private onClick = () => {
      const url = `${location.protocol}//${location.host}${location.pathname}?${serialize(this.props.state)}`;
      this.setState({url});
    }

    private onDismiss = () => {
      this.setState({url: undefined});
    }
  },
);
