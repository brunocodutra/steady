import classes from 'classnames';
import React from 'react';
import ReactDOM from 'react-dom';

import { adapt, isolate } from 'lib/event';

import Interactive from 'component/interactive';

interface Props {
  readonly show: boolean,
  readonly title: string,
  readonly onDismiss: () => void,
  readonly onConfirm?: () => void,
  readonly children?: React.ReactNode,
}

export default class extends React.PureComponent<Props> {
  private portal = document.createElement('div');

  constructor(props: Props) {
    super(props);
    document.body.appendChild(this.portal);
  }

  public override componentWillUnmount(): void {
    this.removeListeners();
    document.body.removeChild(this.portal);
  }

  public override componentDidUpdate(): void {
    if (this.props.show) {
      this.addListeners();
    } else {
      this.removeListeners();
    }
  }

  public override render(): JSX.Element {
    const { show, title, onDismiss } = this.props;
    return ReactDOM.createPortal(
      (
        <>
          <div
            onMouseDown={isolate(onDismiss)}
            className={classes('modal', { show })}
            tabIndex={-1}
            role='dialog'
            aria-labelledby='title'
            aria-hidden={!show}
          >
            <div onMouseDown={isolate(() => null)} className='modal-dialog' role='document'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h5 className='modal-title' id='title'>{title}</h5>
                  <Interactive action={onDismiss} className='close' />
                </div>
                <div className='modal-body'>
                  {this.props.children}
                </div>
                {this.footer()}
              </div>
            </div>
          </div>
          <div className={classes('modal-backdrop', { show })} />
        </>
      ),
      this.portal,
    );
  }

  private footer = () => !this.props.onConfirm ? null : (
    <div className='modal-footer'>
      <button onMouseDown={this.props.onDismiss} type='button' className='btn btn-sm btn-secondary'>Cancel</button>
      <button onMouseDown={this.props.onConfirm} type='button' className='btn btn-sm btn-primary'>OK</button>
    </div>
  )

  private onEnter = adapt(['Enter'], () => this.props.onConfirm && this.props.onConfirm());
  private onEsc = adapt(['Escape'], () => this.props.onDismiss());

  private addListeners() {
    document.addEventListener('keydown', this.onEnter);
    document.addEventListener('keydown', this.onEsc);
  }

  private removeListeners() {
    document.removeEventListener('keydown', this.onEnter);
    document.removeEventListener('keydown', this.onEsc);
  }
}
