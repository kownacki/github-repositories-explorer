import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SearchResults from './SearchResults.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInputText: '',
      lastSearchQuery: '',
    }
  }
  render() {
    return (
      <div>
        <input
          className="search-input"
          onInput={(event) => this.setState({searchInputText: event.target.value})}
          type="text"
        />
        <button className="search-button" onClick={async () => {
          this.setState({lastSearchQuery: this.state.searchInputText});
        }}>Search</button>
        <SearchResults
          searchQuery={this.state.lastSearchQuery}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
