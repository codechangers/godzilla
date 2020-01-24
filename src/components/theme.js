import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import { breakpoints } from '../globals';

/*
 *
 * This is the MUITheme for this entire react app,
 * It allows for ease of customization of Material-UI components which are heavily used throughout the codebase.
 * It is also a good way to compile design standards provided through our design documentation, into a useable format.
 * NOTE: Don't alter this theme except to account for changes to the design documentation.
 *
 */

export default createMuiTheme({
  // Color Palette
  palette: {
    primary: {
      light: '#00AFEF',
      main: '#0094DE',
      dark: '#0070B6'
    },
    secondary: {
      light: '#9FCF5D',
      main: '#7EB637',
      dark: '#558E24'
    },
    error: red,
    contrastThreshold: 3,
    tonalOffset: 0.2
  },

  // Font configuration
  typography: {
    // Headers: h1 - h6
    h1: {
      fontSize: 96,
      lineHeight: '112px',
      fontWeight: 300,
      letterSpacing: -1.5
    },
    h2: {
      fontSize: 60,
      lineHeight: '70px',
      fontWeight: 300,
      letterSpacing: -0.5
    },
    h3: {
      fontSize: 48,
      lineHeight: '56px',
      fontWeight: 300
    },
    h4: {
      fontSize: 34,
      lineHeight: '40px',
      fontWeight: 'normal',
      letterSpacing: 0.25
    },
    h5: {
      fontSize: 24,
      lineHeight: '28px',
      fontWeight: 'normal'
    },
    h6: {
      fontSize: 20,
      lineHeight: '23px',
      fontWeight: 500,
      letterSpacing: 0.15
    },
    // Body text
    body1: {
      fontSize: 18,
      lineHeight: '28px',
      fontWeight: 'normal',
      letterSpacing: 0.5
    },
    body2: {
      fontSize: 14,
      lineHeight: '20px',
      fontWeight: 'normal',
      letterSpacing: 0.25
    },
    // Subtitle text
    subtitle1: {
      fontSize: 16,
      lineHeight: '24px',
      fontWeight: 'normal',
      letterSpacing: 0.15
    },
    subtitle2: {
      fontSize: 14,
      lineHeight: '24px',
      fontWeight: 500
    },
    // Button, Caption, Overline
    button: {
      fontSize: 14,
      lineHeight: '24px',
      fontWeight: 500,
      letterSpacing: 0.75,
      textTransform: 'uppercase'
    },
    caption: {
      fontSize: 12,
      lineHeight: '16px',
      fontWeight: 'normal',
      letterSpacing: 0.4
    },
    overline: {
      fontSize: 10,
      lineHeight: '16px',
      fontWeight: 500,
      letterSpacing: 1.5,
      textTransform: 'uppercase'
    },
    // Global app font-family preferences
    fontFamily: [
      'Roboto',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(',')
  },
  // Default breakpoints for media queries
  breakpoints: {
    values: breakpoints
  }
});
