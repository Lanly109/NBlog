import * as React from 'React';

import './style.css';

import { DoubleNavbar } from './navibar';
export default class Layout extends React.Component {
  render() {
    return (
      <div className="navbar">
        {/* <DoubleNavbar /> */}
        <div>
          <a
            onClick={() => {
              window.electron.ipcRenderer.sendMessage('helloworld', ['ping']);
            }}
            target="_blank"
            rel="noreferrer"
          >
            helloworld
          </a>
        </div>
      </div>
    );
  }
}
