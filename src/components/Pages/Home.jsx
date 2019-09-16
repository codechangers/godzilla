import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Logo, ParentIcon, TeacherIcon } from '../Images';
import '../../assets/css/HomePage.css';

const HomePage = () => (
  <div className="full-width">
    <div className="HomePage-banner">
      <div className="overlay banner">
        <div className="logo">
          <img
            src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/b0052e33-d5c4-4d8e-9645-ca6c9d9d793b/dd2smfi-2c025397-8d76-4d09-8db1-1b7e763ebf3f.png/v1/fill/w_1018,h_785,strp/godzilla_2019_official_png_render_01_by_awesomeness360_dd2smfi-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTIzNCIsInBhdGgiOiJcL2ZcL2IwMDUyZTMzLWQ1YzQtNGQ4ZS05NjQ1LWNhNmM5ZDlkNzkzYlwvZGQyc21maS0yYzAyNTM5Ny04ZDc2LTRkMDktOGRiMS0xYjdlNzYzZWJmM2YucG5nIiwid2lkdGgiOiI8PTE2MDAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.dJKUoyMaZNROi4jSmQydfj7DSa_xNFKQC58EIlSubx4"
            alt="godzilla"
            className="godzilla"
          />
          <Logo className="App-logo" />
        </div>
        <h1>Hello New Platform</h1>
        <div className="buttons">
          <Link to="/signup">Signup</Link>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
    <div className="signups">
      <div className="card">
        <ParentIcon className="card-img" />
        <div className="container">
          <h4>
            <b>Create your Parent account here</b>
          </h4>
          <p>Register your children and get them coding today!</p>
          <Link
            to={{ pathname: '/signup', state: { accountType: 'parent' } }}
            className="card-buttons"
          >
            Sign Up as a Parent
          </Link>
        </div>
      </div>
      <div className="card">
        <TeacherIcon className="card-img" />
        <div className="container">
          <h4>
            <b>Create your Teacher account here</b>
          </h4>
          <p>Start teaching technology to our world&lsquo;s future today!</p>
          <Link
            to={{ pathname: '/signup', state: { accountType: 'teacher' } }}
            className="card-buttons"
          >
            Sign Up as a Teacher
          </Link>
        </div>
      </div>
    </div>
    <footer>
      <Link
        to={{ pathname: '/signup', state: { accountType: 'organization' } }}
        className="footer-buttons"
      >
        Create an Organization
      </Link>
    </footer>
    {/*
      This is a temporary forced redirect to the login page.
      This will prevent anyone from seeing the HomePage.
     */}
    <Redirect to="/login" />
  </div>
);

export default HomePage;
