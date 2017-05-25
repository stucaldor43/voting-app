import React from 'react';
import { Link } from 'react-router';
import PaginationControls from './PaginationControls';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { polls: [], page: 1 };
    }
    
    componentDidMount() {
        this.goToPage(this.state.page);
    }
    
    componentDidUpdate(prevProps, prevState) {
        if (this.state.page !== prevState.page) {
            this.goToPage(this.state.page);
        }   
    }
    
    goToPage(page) {
        fetch(`/api/polls/?page=${this.state.page}`)
              .then(response => response.json())
              .then(json => {
                this.setState({ polls: json.data.polls });
              });
    }

    navigateToNextPage() {
        this.setState((state) => { 
            return {
                page: state.page + 1
            };
        });    
    }
    
    navigateToPreviousPage() {
        this.setState((state) => { 
            return {
                page: state.page - 1 
            };
        });
    }
    
    render() {
        let element;
        element = this.state.polls.map((poll) => {
            return (
              <div>
                <h2><Link to={ `/poll/${poll.id}` }>{ poll.title }</Link></h2>
              </div>
            );
        });
        
        return (
            <div>
              <div>
                { element }
              </div>
              <PaginationControls isNextButtonVisible={ true }
                                  isPreviousButtonVisible={ true }
                                  nextPageClickHandler={ this.navigateToNextPage.bind(this) }
                                  previousPageClickHandler={ this.navigateToPreviousPage.bind(this) }/>
            </div>
        );
    }
}

export default Home;