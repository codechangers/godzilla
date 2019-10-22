import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import { red } from '@material-ui/core/colors';

export default createMuiTheme({
  palette: {
    primary: {
      main: '#8dc63f'
    },
    secondary: blue,
    error: red,
    contrastThreshold: 2,
    tonalOffset: 0.2
  }
});
