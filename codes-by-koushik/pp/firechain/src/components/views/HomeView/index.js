import React from 'react';
import styles from './styles';

export default class HomeView extends React.Component {

  initializeFC = (e) => {
    e.preventDefault();
    console.log(e.target.wallet_address_input.value);
  }

  render() {
    return (
      <div>
        Enter a wallet address to get started:
        <form
          onSubmit={this.initializeFC}
        >
          <input
            type="text"
            name="wallet_address_input"
          />
          <button type="submit">Track</button>
        </form>
      </div>
    );
  }
}
