import Clipboard from 'clipboard';
import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { unwrap } from 'lib/util';
import { serialize, State } from 'state';

import Dialog from 'component/dialog';
import Interactive from 'component/interactive';

const Icon = require('icon/share.svg');

type Props = {
  state: State,
};

type LocalState = {
  show: boolean,
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
        show: false,
      };
    }

    public render() {
      const url = this.state.show ? `${location.origin}${location.pathname}?${serialize(this.props.state)}` : '';

      return ReactDOM.createPortal(
        (
          <Interactive action={this.onClick} className='share'>
            <Icon />
            <Dialog show={this.state.show} title={'Share Link'} onDismiss={this.onDismiss}>
              <div className='input-group'>
                <input id='url' defaultValue={url} className='form-control' />
                <div className='input-group-append'>
                  <button
                    ref={(e) => e && new Clipboard(e)}
                    data-clipboard-target='#url'
                    className='copy'
                    type='button'
                  >
                    copy
                  </button>
                </div>
              </div>
            </Dialog>
          </Interactive>
        ),
        this.share,
      );
    }

    private onClick = () => {
      this.setState({ show: true });
    }

    private onDismiss = () => {
      this.setState({ show: false });
    }
  },
);
