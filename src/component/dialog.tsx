import * as classes from 'classnames';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {adapt, isolate} from 'lib/event';

type Props = {
  show: boolean,
  onCancel: () => void,
  onConfirm: () => void,
};

export default class extends React.PureComponent<Props> {
  private portal = document.createElement('div');

  public componentWillMount() {
    document.body.appendChild(this.portal);
    this.componentWillReceiveProps(this.props);
  }

  public componentWillUnmount() {
    this.componentWillReceiveProps({show: false});
    document.body.removeChild(this.portal);
  }

  public componentWillReceiveProps({show}: Pick<Props, 'show'>) {
    if (show) {
      document.addEventListener('keydown', this.onEnter);
      document.addEventListener('keydown', this.onEsc);
    } else {
      document.removeEventListener('keydown', this.onEnter);
      document.removeEventListener('keydown', this.onEsc);
    }
  }

  public render() {
    const {show, onCancel, onConfirm} = this.props;
    return ReactDOM.createPortal(
      <>
        <div
          onMouseDown={isolate(onCancel)}
          className={classes('modal', {show})}
          tabIndex={-1}
          role='dialog'
          aria-labelledby='title'
          aria-hidden={!show}
        >
          <div onMouseDown={isolate(() => null)} className='modal-dialog' role='document'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title' id='title'>Title</h5>
                <button onMouseDown={onCancel} type='button' className='close' aria-label='Close'/>
              </div>
              <div className='modal-body'>
                {this.props.children}
              </div>
              <div className='modal-footer'>
                <button onMouseDown={onCancel} type='button' className='btn btn-sm btn-secondary'>Cancel</button>
                <button onMouseDown={onConfirm} type='button' className='btn btn-sm btn-primary'>OK</button>
              </div>
            </div>
          </div>
        </div>
        <div className={classes('modal-backdrop', {show})}/>
      </>,
      this.portal,
    );
  }

  private onEnter = adapt(['Enter'], () => this.props.onConfirm());
  private onEsc = adapt(['Escape'], () => this.props.onCancel());
}
