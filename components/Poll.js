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
    }
    
    componentDidMount() {
        fetch(`/api/polls/${this.props.params.id}`)
          .then(response => response.json())
          .then(json => {
            this.setState({ poll: json.data });
          });
    }

    submitVote() {
    
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
            <form>
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