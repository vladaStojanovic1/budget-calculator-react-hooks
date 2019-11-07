import React from 'react'
import RubberBand from 'react-reveal/RubberBand';

const Alert = ({ type, text }) => {
    return (
        <RubberBand>
            <div className={`alert alert-${type}`}>
                {text}
            </div>
        </RubberBand>
    )
}
export default Alert