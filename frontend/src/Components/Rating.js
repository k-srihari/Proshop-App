import { StrictMode } from "react"
import PropTypes from 'prop-types'

const Rating = ({value, rating, color}) => {
    return (
        <StrictMode>
            <span><i 
            style = {{color}}
            className = {
                value >= 1
                ? 'fas fa-star'
                : value >= 0.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
            }
            /></span>
            <span><i 
            style = {{color}}
            className = {
                value >= 2
                ? 'fas fa-star'
                : value >= 1.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
            }
            /></span>
            <span><i 
            style = {{color}}
            className = {
                value >= 3
                ? 'fas fa-star'
                : value >= 2.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
            }
            /></span>
            <span><i 
            style = {{color}}
            className = {
                value >= 4
                ? 'fas fa-star'
                : value >= 3.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
            }
            /></span>
            <span><i 
            style = {{color}}
            className = {
                value >= 5
                ? 'fas fa-star'
                : value >= 4.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
            }
            /></span>
            <span> {rating} </span>
        </StrictMode>
    )
}

Rating.defaultProps = {
    color: '#f8e825'
}

Rating.propTypes = {
    value: PropTypes.number.isRequired,
    rating: PropTypes.string.isRequired
}

export default Rating