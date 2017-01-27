import React from 'react';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {polls: []};
    }
    
    componentDidMount() {
        fetch("/api/polls")
        .then(response => response.json())
        .then(json => {
            this.setState({polls: json.data});
        });
    }
    
    render() {
        return (
            <div>
                {this.state.polls.map((poll) => {
                    return (
                        <div>
                          <h1>{poll.title}</h1>
                          <p>{poll.id}</p>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default Home;