import React, {Component} from 'react'
import './Search.css'
import {withRouter} from 'react-router-dom'
import {handleResponse} from '../../helpers'
import {API_URL} from '../../config'
import Load from '../../Loading'

class Search extends Component{
    constructor(props){
        super(props)
        this.state={
            result: [],
            searchQuery: '',
            loading: false
        }
    }

    handleChange = (e) =>{
        const searchQuery = e.target.value

        this.setState({
            searchQuery
        })
        if(!searchQuery){
            return ''
        }
        this.setState({loading: true})

        fetch(`${API_URL}/autocomplete?searchQuery=${searchQuery}`)
        .then(handleResponse)
        .then(res => {
            this.setState({
                result: res,
                loading: false
            })
        })
    }

    redirect = (id) =>{
        this.setState({
            result: [],
            searchQuery: ''
        })

        this.props.history.push(`/currency/${id}`)
    }

    searchResult = () =>{
        const {result,loading,searchQuery} = this.state

        if(!searchQuery){
            return ''
        }

        if(result.length > 0){
            return(
                <div className="Search-result-container">
                    {result.map(res =>(
                        <div key={res.id} className="Search-result" onClick={() => this.redirect(res.id)}>
                            {res.name} ({res.symbol})
                        </div>
                    ))}
                </div>
            )
        }
        
        if(!loading){
            return(
                <div className="Search-result-container">
                  <div className="Search-no-result">
                    No results found.
                  </div>
                </div>
            )
        }
    }

    render(){
        return(
            <div className="Search">
                <span className="Search-icon"/>
                <input 
                    className="Search-input" 
                    onChange={this.handleChange}
                    type="text"
                    placeholder="currency"
                    value={this.state.searchQuery}
                />
                {this.state.loading &&
                    <div className="Search-loading">
                    <Load 
                        width='12px'
                        height='12px'
                    />
                </div>}
                {this.searchResult()}
            </div>
        )
    }
}

export default withRouter(Search)