import { StrictMode } from 'react'
import PropTypes from 'prop-types'

const Rating = ({ value, ratings, color }) => {
  return (
    <StrictMode>
      {ratings > 0 && (
        <span>
          <span>
            <i
              style={{ color }}
              className={
                value >= 1
                  ? 'fas fa-star'
                  : value >= 0.5
                  ? 'fas fa-star-half-alt'
                  : 'far fa-star'
              }
            />
          </span>
          <span>
            <i
              style={{ color }}
              className={
                value >= 2
                  ? 'fas fa-star'
                  : value >= 1.5
                  ? 'fas fa-star-half-alt'
                  : 'far fa-star'
              }
            />
          </span>
          <span>
            <i
              style={{ color }}
              className={
                value >= 3
                  ? 'fas fa-star'
                  : value >= 2.5
                  ? 'fas fa-star-half-alt'
                  : 'far fa-star'
              }
            />
          </span>
          <span>
            <i
              style={{ color }}
              className={
                value >= 4
                  ? 'fas fa-star'
                  : value >= 3.5
                  ? 'fas fa-star-half-alt'
                  : 'far fa-star'
              }
            />
          </span>
          <span>
            <i
              style={{ color }}
              className={
                value >= 5
                  ? 'fas fa-star'
                  : value >= 4.5
                  ? 'fas fa-star-half-alt'
                  : 'far fa-star'
              }
            />
          </span>
        </span>
      )}
      <span>{ratings > 0 ? ` ${ratings} reviews` : 'No Reviews Yet!'}</span>
    </StrictMode>
  )
}

Rating.defaultProps = {
  color: '#f8e825',
}

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  ratings: PropTypes.number.isRequired,
}

export default Rating
