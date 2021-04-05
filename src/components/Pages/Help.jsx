import React from 'react';
import '../styles.css';
import 'firebase/auth';
import autoBind from '../../autoBind';

class Help extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    return (
      <header>
        <div className="page">
          <div className="dark-hero1 login-page">
            <div>
              <div className="login-box sponsor-hero margin-top dark-hero1">
                <h1 className="form-header px">Need Help?</h1>
              </div>
              <div className="home-section-large home-section-help">
                <h2 className="form-header px">Follow These Steps</h2>
                <p>
                  Step 1: Proofread and triple check that your code doesn’t have any spelling
                  errors.
                </p>
                <p>
                  Step 2: Ask a classmate, check the tutorial again, look at the Docs section on the
                  website, and then ask your teacher or room supervisor!
                </p>
                <p> Step 3: Hop on the Mentor Help Line! </p>
                <h2 className="form-header px">Important!</h2>
                <p>
                  Wait in the meeting room for a mentor to put you into a breakout room for help. If
                  you do not see any mentors, they are helping others, but will be back to help you
                  shortly! Be patient and read through your code again while you wait!
                </p>
                <p>
                  Click
                  <a
                    href="https://us02web.zoom.us/j/83598664504?pwd=bmJoZ25ldzBsVjJrT3lDVFkzNTR3dz09"
                    target="_blank"
                    rel="noreferrer"
                    className="link"
                  >
                    this link
                  </a>
                  to access the Zoom call.
                </p>
                <p>
                  Make sure to choose the option on the Zoom meeting that says Join From Browser and
                  then once you join, click the Join with Computer Audio button
                </p>
                <p> The passcode for your call is: GWA </p>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Help;
