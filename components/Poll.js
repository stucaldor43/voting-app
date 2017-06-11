import React from 'react';
import { PropTypes } from 'react';
import PieChart from './PieChart';

class Poll extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
          poll: {
            options: []
          } 
        };
        this.submitVote = this.submitVote.bind(this);
    }
    
    componentDidMount() {
        fetch(`/api/polls/${this.props.params.id}`, {credentials: "same-origin"})
          .then(response => response.json())
          .then(json => {
            this.setState({ poll: json.data });
          });
    }

    submitVote() {
      let chosenPollOptionValue;
      for (const input of document.getElementsByTagName("input")) {
        if (input.checked === true) {
          chosenPollOptionValue = input.value;
          break;
        }
      }
      fetch("/api/polls/2/vote", {
        method: "POST",
        body: JSON.stringify({
          voters_selection: chosenPollOptionValue
        }),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
      })
        .then(() => {
          return fetch(`/api/polls/${this.props.params.id}`, {credentials: "same-origin"})
                  .then(response => response.json())
                  .then(json => {
                    this.setState({ poll: json.data });
                  });
        });
    }
    
    render() {
        const pollOptionRadioButtons = this.state.poll.options.map((pollChoice) => {
           return (
               <li>
                 <label htmlFor={ pollChoice.id }>
                 <input id={ pollChoice.id  } 
                        type="radio" 
                        name="voters_selection" 
                        value={ pollChoice.message }/>
                 { pollChoice.message }</label>
               </li>
           );
        });
        
        return (
          <div>
            <form method="post" action="/api/polls/2/vote">
              <ul>
                { pollOptionRadioButtons }
              </ul>
              <input type="submit" value="Vote" onClick={ this.submitVote }/>
            </form>
            <div>
              <PieChart chartLabels={this.state.poll.options.map((choice) => choice.message)}
                        chartData={this.state.poll.options.map((choice) => choice.votes)}/>
            </div>
          </div>
        );
    }
}

export default Poll;