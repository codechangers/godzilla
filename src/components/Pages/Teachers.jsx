import React from 'react';
import 'firebase/auth';
import autoBind from '../../autoBind';
import flowchart from '../../assets/images/flowchart.png';

class Teachers extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    return (
      <header>
        <div>
          <div>
            <div>
              <div>
                <h1>Teacher Support Page</h1>
              </div>
              <div>
                <h2>Want to help?</h2>
                <p>
                  Here’s an overview of what the kids will be working on through their tutorials,
                  and some helpful hints for teachers and room supervisors!
                </p>
                <img src={flowchart} alt="flowchart" width="500" />
                <h2>Tutorial Process:</h2>
                <p>1. Visit replit.com and make an account </p>
                <p>
                  2. Once created, paste in this tutorial link into the search bar
                  <a
                    href="https://replit.com/@codechangers/io-template"
                    target="_blank"
                    rel="noreferrer"
                  >
                    https://replit.com/@codechangers/io-template
                  </a>
                </p>
                <p>3. Click “Fork” </p>
                <p>
                  4. On the top left side of the screen, click the three dots and “Download as Zip”
                </p>
                <h2>Create a blobbert.io account</h2>
                <p>1. Visit blobbert.io and make an account </p>
                <p>2. Click “New Game” </p>
                <p>3. Name the game (i.e. testgame, systemcheck, etc.)</p>
                <p>4. Click “Default Template” </p>
                <p>
                  5. Click and drag the code downloaded from replit.com into the code box on the
                  website
                </p>
                <p>6. Wait for the server to go online (up to 10 minutes)</p>
                <h2>Code and test the game</h2>
                <p>
                  1. Follow the tutorials from the tutorial link to start coding on the template
                  that was forked on replit.com
                </p>
                <p>
                  2. Download the code from replit.com as a zip using the three dots on the left
                </p>
                <p>
                  3. Upload the edited code into the game you created on the blobbert.io website
                </p>
                <h2>Mentor help</h2>
                <p>
                  1. Competitors can access their mentors by visiting
                  <a href="/help/gwa">https://www.codecontest.org/help/gwa</a>
                </p>
                <p>
                  2. Click on the zoom link, and wait in the waiting room for a mentor to assign a
                  breakout room for help!
                </p>
                <h2>Troubleshooting</h2>
                <p>1. Proofread, proofread, proofread! Most mistakes are spelling errors! </p>
                <p>
                  2. If the sites won’t load, please contact us! Most of the time this is a wifi or
                  firewall issue and we can work with your site to get it resolved.
                </p>
                <h2>Still Have Questions?</h2>
                <div>
                  <p> madi@codecontest.org</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Teachers;
