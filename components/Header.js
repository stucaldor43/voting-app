import React from 'react';
import OAuth from 'oauth';

class Header extends React.Component {
    constructor(props) {
      super(props);
      this.signIn = this.signIn.bind(this);
    }
    
    signIn() {
      fetch("/api/get_request_token", {credentials: "same-origin"})
          .then((res) => res.json())
          .then((json) => {
            const data = json.data;
            localStorage.setItem("token", data.token);
            localStorage.setItem("secret", data.secret)
            location.assign(`https://api.twitter.com/oauth/authorize?oauth_token=${data.token}`);
          })
    }
    
    render() {
        return(<header>
                <nav>
                  <ul>
                    <li>
                      <button onClick={this.signIn}>Sign In</button>
                    </li>
                  </ul>
                </nav>
              </header>
        );    
    }
}

export default Header;