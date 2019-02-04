import React from 'react'
import PropTypes from 'prop-types'
import './Loading.css'

const Load = ({width, height}) =>{
    return <div className="Loading" style={{width, height}}/>
}

Load.defaultProps = {
    width:'28px',
    height:'28px'
}

Load.propTypes = {
    width : PropTypes.string,
    height: PropTypes.string
}

export default Load