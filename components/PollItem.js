import React from 'react';
import { PropTypes } from 'react';
import { Link } from 'react-router';

class PollItem extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
          <div>
            <h2><Link to={ `/poll/${ this.props.poll.id }` }>{ this.props.poll.title }</Link></h2>
            <button onClick={ this.props.deletePoll }>Delete</button>
          </div>    
        );
    }
}

PollItem.propTypes= {
    deletePoll: PropTypes.func.isRequired,
    poll: PropTypes.object.isRequired
};

export default PollItem;