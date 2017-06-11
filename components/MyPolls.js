import React from 'react';
import { PropTypes } from 'react';
import { Link } from 'react-router';
import PollItem from './PollItem';

class MyPolls extends React.Component {
    constructor(props) {
        super(props);
        this.state = { polls: [], page: 0 };
        this.loadMorePolls = this.loadMorePolls.bind(this);
        this.deletePoll = this.deletePoll.bind(this);
    }
    
    componentDidMount() {
        this.loadMorePolls();
    }
    
    loadMorePolls() {
        fetch(`/api/clients/1/createdPolls/?page=${this.state.page + 1}`, {credentials: "same-origin"})
          .then(response => response.json())
          .then(json => {
            this.setState((state) => { 
              return {
                polls: state.polls.concat(json.data.polls),
                page: state.page + 1
              } 
            });
          });  
    }

    deletePoll(deletedPollId) {
      fetch(`/api/polls/${deletedPollId}`, {
        method: "DELETE",
        credentials: "same-origin"
      })
        .then(() => {
          this.setState((state) => {
            return {
              polls: state.polls.filter((poll) => poll.id !== deletedPollId)
            }
          })
        })
    }
    
    render() {
      const createPollButton = <button><Link to="/poll-creation">Create Poll</Link></button>;
      const loadPollsButton = <button onClick={ this.loadMorePolls }>Load More</button>;
      const pollItems = this.state.polls.map((poll) => {
          return (
              <PollItem poll={ poll } deletePoll={ this.deletePoll.bind(null, poll.id) } />             
          );
      });
      
      return (
        <div>
          <div>
            { createPollButton }
          </div>
          <div>
            { pollItems }      
          </div>
          <div>
            { loadPollsButton }
          </div>
        </div>
      );
    }
}

export default MyPolls;