import styled from '@emotion/styled';

// SignUp Layout Styles
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

// All SignUp Form Styles
export const Title = styled.h2({
  fontFamily: 'Roboto',
  fontWeight: 300,
  fontSize: 40,
  letterSpacing: -0.5
});

export const Subtitle = styled.h3({
  fontFamily: 'Roboto',
  fontWeight: 400,
  fontSize: 22,
  margin: '0 5px 10px'
});

export const LinkButtonWrapper = styled.div({
  display: 'flex',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center'
});

export const LinkButton = styled.button(
  {
    maxWidth: 'fit-content',
    border: 'none',
    outline: 'none',
    margin: 0,
    padding: 0,
    width: 'auto',
    overflow: 'visible',
    background: 'transparent',
    font: 'inherit',
    fontSize: 14,
    lineHeight: '36px',
    textTransform: 'uppercase',
    cursor: 'pointer',
    ':hover': {
      textDecoration: 'underline'
    }
  },
  ({ error }) => ({
    color: error ? '#FF0C3E' : 'inherit'
  })
);

export const AccountLinkButtonWrapper = styled.div({
  display: 'flex',
  width: 'calc(100% - 66px)', // -66 because of wrapper padding
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  paddingRight: 64,
  boxSizing: 'border-box',
  bottom: 30,
  '@media (max-width: 600px)': {
    width: 'calc(100% - 40px)',
    paddingRight: 0
  }
});

export const AccountLinkButton = styled.button(
  {
    maxWidth: 'fit-content',
    border: 'none',
    outline: 'none',
    margin: 0,
    padding: 0,
    width: 'auto',
    overflow: 'visible',
    background: 'transparent',
    font: 'inherit',
    fontSize: 14,
    lineHeight: '36px',
    textTransform: 'uppercase',
    cursor: 'pointer',
    ':hover': {
      textDecoration: 'underline'
    },
    '@media (max-width: 600px)': {
      lineHeight: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  },
  ({ error }) => ({
    color: error ? '#FF0C3E' : 'inherit'
  })
);

export const FormFieldsContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%'
});

export const FormFieldsRow = styled.div({
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  '@media (min-width: 600px)': {
    flexDirection: 'row'
  },
  '& .MuiFormControl-root': {
    width: '100%',
    margin: '6px 0',
    '@media (min-width: 600px)': {
      margin: 5
    }
  }
});

export const CheckboxRow = styled.div({
  margin: 0,
  '@media (min-width: 600px)': {
    margin: 5
  }
});

export const FormFieldsOptions = styled.div({
  marginTop: 20,
  display: 'flex',
  flexDirection: 'column'
});

// AccountType styles
export const AccountType = styled.div({
  width: '100%',
  minHeight: '100vh',
  boxSizing: 'border-box',
  backgroundColor: '#f4f4f4',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '30px 64px',
  overflow: 'scroll',
  '@media (max-width: 600px)': {
    padding: '30px 20px'
  }
});

export const AccountSelectionSection = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  marginTop: 54,
  marginBottom: 75,
  backgroundColor: '#f4f4f4'
});

export const AccountSelectionCards = styled.div({
  display: 'flex',
  justifyContent: 'space-around',
  width: '100%',
  maxWidth: 750,
  flexWrap: 'wrap',
  '& .MuiCard-root': {
    margin: 15
  },
  '& .MuiCardContent-root': {
    padding: '0 16px 16px'
  }
});

// ParentSignUp styles
export const NavigationButtons = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  height: '100%'
});

export const ActionInner = styled.div({
  width: '100%',
  hight: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  '@media (max-width: 420px)': {
    marginTop: '100%'
  }
});

export const ListItem = styled.div({
  backgroundColor: 'white',
  borderRadius: 0,
  '&:nth-child(odd)': {
    backgroundColor: '#F4F4F4',
    borderRadius: 4
  },
  '@media (max-width: 420px)': {
    paddingBottom: '56px'
  }
});

export const SignUpSuccess = styled.div({
  backgroundColor: 'white',
  borderRadius: 4,
  padding: 20
});
