import React from 'react'
import './Detail.css'
import {API_URL} from './config'
import Load from './Loading'
import {handleResponse, renderChangePercent} from './helpers'

class Detail extends React.Component{
    constructor(){
        super();
        this.state={
            currency: {},
            loading: false,
            error: null
        }
    }

    componentDidMount(){
        const currentId = this.props.match.params.id
        this.renderFetch(currentId)
    }
    componentWillReceiveProps(nextProps){
        if(this.props.location.pathname !== nextProps.location.pathname){
            const currency = nextProps.match.params.id
            this.renderFetch(currency)
        } 
    }

    renderFetch = (id) =>{
        this.setState({loading: true})

        fetch(`${API_URL}/cryptocurrencies/${id}`)
        .then(handleResponse)
        .then(currency => {
            this.setState({
                currency,
                loading: false,
                error: null
            })
        })
        .catch(error =>{
            this.setState({
                error: error.Message,
                loading: false
            })
        })
    }
    render(){
        const {loading,error,currency} = this.state;

        if(loading){
            return <div className="loading-container"><Load /></div>
        }

        if(error){
            return <div className="error">{error}</div>
        }

        return(
            <div className="Detail">
                <h1 className="Detail-heading">
                    {currency.name}
                    ({currency.symbol})
                </h1>
                <div className="Detail-container">
                    <div className="Detail-item">
                        Price <span className="Detail-value">$ {currency.price}</span>
                    </div>
                    <div className="Detail-item">
                        Rank <span className="Detail-value">{currency.rank}</span>
                    </div>
                    <div className="Detail-item">
                        24H <span className="Detail-value">{renderChangePercent(currency.percentChange24h)}</span>
                    </div>
                    <div className="Detail-item">
                        <span className="Detail-title">Market Cap</span>
                        <span className="Detail-dollar">$</span>
                        {currency.marketCap}
                    </div>
                    <div className="Detail-item">
                        <span className="Detail-title">24H Volume</span>
                        <span className="Detail-dollar">$</span>
                        {currency.volume24h}
                    </div>
                    <div className="Detail-item">
                        <span className="Detail-title">Total supply</span>
                        {currency.totalSupply}
                    </div>
                </div>
            </div>
        )
    }
}

export default Detail