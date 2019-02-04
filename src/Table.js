import React from 'react'
import './Table.css'
import PropTypes from 'prop-types'
import {renderChangePercent} from './helpers'
import { withRouter } from 'react-router-dom';

const Table = (props) =>{
    return(
        <div className="Table-container">
        <table className="Table">
          <thead className="Table-head">
            <tr>
              <td>Crypto</td>
              <td>Price</td>
              <td>Market</td>
              <td>24H Change</td>
            </tr>
          </thead>
          <tbody className="Table-body">
            {props.currency.map(current =>(
              <tr key={current.id}
              onClick= {() => props.history.push(`/currency/${current.id}`)}
              >
                <td>
                  <span className="Table-rank">{current.rank}</span>
                  {current.name}
                </td>
                <td>
                  <span className="Table-dollar">$</span>
                  {current.price}
                </td>
                <td>
                  <span className="Table-dollar">$</span>
                  {current.marketCap}
                </td> 
                <td>
                  {renderChangePercent(current.percentChange24h)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
}

Table.propTypes = {
    currency: PropTypes.array.isRequired,
    history: PropTypes.object.isRequired
}

export default withRouter(Table)