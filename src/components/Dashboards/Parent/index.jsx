import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import autoBind from '../../../autoBind';
import Profile from './Profile';
import NavBar from '../../NavBar';
import '../../../assets/css/Parent-Dash.css';
import ClassSignUp from './ClassSignUp';
import ClassView from './ClassView';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  toolbar: theme.mixins.toolbar
}));

const buttonToComponent = {
  Home: 'Default',
  'Find a Class': 'findAClass',
  'Sign Up for Classes': 'ClassSignUp',
  'View Classes': 'classView',
  'My Profile': 'Profile'
};

class ParentDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeComponent: 'default'
    };
    this.firebase = this.props.firebase;
    autoBind(this);
  }

  getOthers() {
    switch (this.state.activeComponent) {
      case 'ClassSignUp':
        return <ClassSignUp accounts={this.props.accounts} db={this.props.db} />;
      case 'classView':
        return <ClassView accounts={this.props.accounts} />;
      default:
        return (
          <>
            <div>
              <h1>Welcome to the Parent Dashboard</h1>
            </div>
            <Typography paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent
              elementum facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in
              hendrerit gravida rutrum quisque non tellus. Convallis convallis tellus id interdum
              velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing.
              Amet nisl suscipit adipiscing bibendum est ultricies integer quis. Cursus euismod quis
              viverra nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo.
              Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus
              at augue. At augue eget arcu dictum varius duis at consectetur lorem. Velit sed
              ullamcorper morbi tincidunt. Lorem donec massa sapien faucibus et molestie ac.
            </Typography>
            <Typography paragraph>
              Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
              facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
              tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet
              volutpat consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at
              quis risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra
              accumsan in. In hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec
              nam aliquam sem et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
              tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis eleifend.
              Commodo viverra maecenas accumsan lacus vel facilisis. Nulla posuere sollicitudin
              aliquam ultrices sagittis orci a.
            </Typography>
          </>
        );
    }
  }

  handleClick(val) {
    const newState = {};
    newState.activeComponent = buttonToComponent[val];
    this.setState({ ...newState });
  }

  render() {
    return this.props.user.isSignedIn ? (
      <>
        <NavBar accounts={this.props.accounts} firebase={this.firebase} />
        <div id="drawer">
          <div className="content-container">
            <CssBaseline />
            <Drawer
              className={useStyles.drawer}
              variant="permanent"
              classes={{
                paper: useStyles.drawerPaper
              }}
            >
              <List>
                {Object.keys(buttonToComponent)
                  .slice(0, -1)
                  .map(text => (
                    <ListItem
                      button
                      key={text}
                      onClick={() => {
                        this.handleClick(text);
                      }}
                    >
                      <ListItemText primary={text} />
                    </ListItem>
                  ))}
              </List>
              <Divider />
              <List>
                {['My Profile'].map(text => (
                  <ListItem
                    button
                    key={text}
                    onClick={() => {
                      this.handleClick(text);
                    }}
                  >
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
            </Drawer>
            <main className="list-item-container">
              {this.state.activeComponent === 'Profile' ? (
                <Profile firebase={this.firebase} user={this.props.user} />
              ) : (
                this.getOthers()
              )}
            </main>
          </div>
        </div>
      </>
    ) : (
      <Redirect to="/login" />
    );
  }
}

ParentDashboard.propTypes = {
  firebase: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  accounts: PropTypes.object.isRequired,
  db: PropTypes.object.isRequired
};

export default ParentDashboard;
