import Clipboard from 'clipboard';
import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { unwrap } from 'lib/util';
import { serialize } from 'lib/serde';
import { State } from 'state';
import Dialog from 'component/dialog';
import Interactive from 'component/interactive';
import Icon from 'icon/share.svg';

interface Props {
  readonly state: State,
}

interface LocalState {
  readonly show: boolean,
}

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

    public override render(): JSX.Element {
      const url = this.state.show ? `${location.origin}${location.pathname}?${serialize(this.props.state)}` : '';

      return ReactDOM.createPortal(
        (
          <Interactive action={this.onClick} className='share'>
            <Icon />
            <Dialog show={this.state.show} title={'Share Link'} onDismiss={this.onDismiss}>
              <div className='input-group'>
                <input id='url' defaultValue={url} className='form-control' />
                <button
                  ref={(e) => e && new Clipboard(e)}
                  data-clipboard-target='#url'
                  className='copy'
                  type='button'
                >
                  Copy
                </button>
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
