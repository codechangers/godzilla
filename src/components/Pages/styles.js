import styled from '@emotion/styled';

export const SignupWrapper = styled.div({
  width: '100%',
  minHeight: '100vh',
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  boxSizing: 'border-box',
  backgroundColor: '#f4f4f4'
});

export const Form = styled.div(
  {
    width: '100%',
    '@media (max-width: 750px)': {
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
  cursor: 'pointer',
  padding: 0
});

export const LogoText = styled.img({
  maxWidth: 240,
  position: 'absolute',
  top: 30,
  left: 64,
  '@media (max-width: 789px)': {
    width: '60%',
    maxWidth: '789px',
    left: 'calc(20% + 8px)'
  }
});
