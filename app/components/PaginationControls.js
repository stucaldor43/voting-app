import React from 'react';
import { PropTypes } from 'react';

class PaginationControls extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const { previousPageClickHandler, nextPageClickHandler, isPreviousButtonVisible, isNextButtonVisible } = this.props;
        const previousPageButton = (isPreviousButtonVisible) ? <button onClick={ previousPageClickHandler }>Previous</button> : null;
        const nextPageButton = (isNextButtonVisible) ? <button onClick={ nextPageClickHandler }>Next</button> : null;
        
        return (
          <div>
            { previousPageButton } { nextPageButton }
          </div>  
        );
    }
}

PaginationControls.propTypes = {
  isNextButtonVisible: PropTypes.bool.isRequired,
  isPreviousButtonVisible: PropTypes.bool.isRequired,
  nextPageClickHandler: PropTypes.func,
  previousPageClickHandler: PropTypes.func
};

export default PaginationControls;