import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.svg';
import '../assets/css/HomePage.css';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accountType: null
    };
  }

  render() {
    return (
      <div className="HomePage-banner">
        <div className="overlay banner">
          <div className="logo">
            <img
              src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/b0052e33-d5c4-4d8e-9645-ca6c9d9d793b/dd2smfi-2c025397-8d76-4d09-8db1-1b7e763ebf3f.png/v1/fill/w_1018,h_785,strp/godzilla_2019_official_png_render_01_by_awesomeness360_dd2smfi-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTIzNCIsInBhdGgiOiJcL2ZcL2IwMDUyZTMzLWQ1YzQtNGQ4ZS05NjQ1LWNhNmM5ZDlkNzkzYlwvZGQyc21maS0yYzAyNTM5Ny04ZDc2LTRkMDktOGRiMS0xYjdlNzYzZWJmM2YucG5nIiwid2lkdGgiOiI8PTE2MDAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.dJKUoyMaZNROi4jSmQydfj7DSa_xNFKQC58EIlSubx4"
              alt="godzilla"
              className="godzilla"
            />
            <img src={logo} className="App-logo" alt="logo" />
          </div>
          <h1>Hello New Platform</h1>
          <div className="buttons">
            <Link to="/login">Login</Link>
          </div>
          <div className="signupbuttons">
            <Link to={{ pathname: '/signup', state: { accountType: 'parent' } }}>
              Sign Up as a Parent
            </Link>
            <Link to={{ pathname: '/signup', state: { accountType: 'teacher' } }}>
              Sign Up as a Teacher
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
