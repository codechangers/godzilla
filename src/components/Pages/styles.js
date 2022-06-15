import styled from '@emotion/styled';
import { breakpoints } from '../../utils/globals';

export const SignupWrapper = styled.div({
  width: '100%',
  minHeight: '100vh',
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  boxSizing: 'border-box',
  backgroundColor: 'var(--background-color)'
});

export const Form = styled.div(
  {
    width: '100%',
    [breakpoints.down.xs]: {
      maxWidth: '98% !important',
      marginTop: 80
    }
  },
  ({ full }) => ({
    maxWidth: full ? '100%' : '60%',
    '& .MuiCardHeader-title': {
      fontFamily: 'Roboto',
      fontWeight: 300,
      fontSize: full ? 30 : 36,
      letterSpacing: -0.5
    },
    '& .MuiCardHeader-root': {
      padding: full ? 16 : '16px 16px 0'
    }
  })
);

export const LogoButton = styled.button({
  background: 'none',
  outline: 'none',
  border: 'none',
  cursor: 'pointer',
  position: 'absolute',
  top: 30,
  left: 64,
  padding: 0,
  [breakpoints.down.xs]: {
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
  }
});

export const LogoText = styled.img({
  maxWidth: 240
});
