import React, {Component} from 'react';

class ErrorPage extends Component {
  render() {
    return (
      <div className='d-flex flex-column align-items-center'>
        <h3>Hello, welcome!</h3>
        <p className='text-center'>To access an admin page, please register as user with administrator rights.</p>
        <p className='text-center'>For that simply use the following registration data:</p>
        <p><b>Username:</b> user1</p>
        <p><b>Password:</b> password1</p>
        <p className='text-center'>
          Here you can also find additional endpoints to get &nbsp;
          <a href="http://localhost:8080/categories">categories</a> and &nbsp;
          <a href="http://localhost:8080/articles">articles</a> in JSON format.
        </p>
      </div>
    );
  }
}

export default ErrorPage;