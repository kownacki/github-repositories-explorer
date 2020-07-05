import React from 'react';
export default class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResponse: null,
    }
  }
  async componentDidUpdate(prevProps) {
    if (!prevProps || this.props.searchQuery !== prevProps.searchQuery) {
      const query = this.props.searchQuery.replace(' ', '+');
      // todo race condition
      const response = await fetch(`https://api.github.com/search/users?q=${query}&per_page=5`);
      this.setState({searchResponse: await response.json()});
    }
  }
  render() {
    return (
      <div>
        Showing users for "{this.props.searchQuery}"
        <ul>
          {this.state.searchResponse && this.state.searchResponse.items.map((item) =>
            <li key={item.id}>{item.login}</li>
          )}
        </ul>
        <br />
      </div>
    );
  }
}
