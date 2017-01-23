import React from 'react';
import OAuth from 'oauth';

class Header extends React.Component {
    constructor(props) {
      super(props);
    }
    
    signIn() {
      var self = this;
      
      var req = new XMLHttpRequest();
      req.addEventListener("load", function() {
        const response = JSON.parse(this.response);
        if (response.status === "success") {
          const data = response.data;
          localStorage.setItem("token", data.token);
          localStorage.setItem("secret", data.secret)
          location.assign(`https://api.twitter.com/oauth/authorize?oauth_token=${localStorage.getItem("token")}`);
        }
        
      });
      req.open("GET", "/api/get_request_token");
      req.send();
    }
    
    componentDidMount() {
      const queryString = location.search;
      if (queryString.indexOf("oauth_token") >= 0 && 
          queryString.indexOf("oauth_verifier") >= 0) {
            const query = {};
            const parameters = queryString.substring(1).split("&");
            for (const parameter of parameters) {
              query[parameter.split("=")[0]] = parameter.split("=")[1];
            }
            localStorage.setItem("verifier", query["oauth_verifier"]);
      }
      
      var req = new XMLHttpRequest();
      req.addEventListener("load", function() {
        const response = JSON.parse(this.response);
        if (response.status === "success") {
          console.log(response);
          
        }
        
      });
      req.open("GET", `/api/get_access_token?token=${localStorage.token}&secret=${localStorage.secret}&verifier=${localStorage.verifier}`);
      req.send();
    }
    
    render() {
        return(<header>
                <nav>
                  <ul>
                    <li>
                      <button onClick={this.signIn.bind(this)}>Sign In</button>
                    </li>
                  </ul>
                </nav>
              </header>
        );    
    }
}

export default Header;