import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInputText: '',
      searchResponse: null,
    }
  }
  render() {
    return (
      <div>
        <input
          className="search-input"
          onInput={(event) => this.setState({searchInputText: event.target.value})}
          type="text">
        </input>
        <button className="search-button" onClick={async () => {
          const q = this.state.searchInputText.replace(' ', '+');
          const response = await fetch(`https://api.github.com/search/users?q=${q}&per_page=5`);
          this.state.searchResponse = await response.json();
          console.log(this.state.searchResponse);
        }}>Search</button>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
