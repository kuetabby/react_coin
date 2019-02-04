import React from 'react';
import {API_URL} from './config'
import Load from './Loading'
import Table from './Table'
import Pagination from './pagination'

class List extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      currencies: [],
      error: null,
      totalPages: 0,
      page: 1
    };
  }

  componentDidMount() {
    this.currentFetch()
  }

  currentFetch = () =>{
    this.setState({ loading: true });
    fetch(`${API_URL}/cryptocurrencies?page=${this.state.page}&perPage=20`)
      .then(response => {
        return response.json().then(json => {
          return response.ok ? json : Promise.reject(json);
        });
      })
      .then((data) => {
        this.setState({
          currencies: data.currencies,
          totalPages: data.totalPages,
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({
          error: error.errorMessage,
          loading: false,
        });
      });
  }

  changePage = (direction) =>{ 
    let nextPage = this.state.page;

    nextPage = direction === 'next' ? nextPage + 1 : nextPage - 1;

    this.setState({page: nextPage}, () => this.currentFetch())
  }

  render() {
    if (this.state.loading) {
      return <div className="loading-container"><Load /></div>
    }
    return(
      <div>
        <Table 
        currency={this.state.currencies} 
        />
        <Pagination
          page={this.state.page}
          totalPages={this.state.totalPages}
          changePage={this.changePage} 
        />
      </div>
    )
  }
}

export default List;
