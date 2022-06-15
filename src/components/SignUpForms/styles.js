import styled from '@emotion/styled';
import { breakpoints } from '../../utils/globals';
import { rgba } from '../../utils/helpers';

// AccountType styles
export const AccountType = styled.div({
  width: '100%',
  minHeight: '100vh',
  boxSizing: 'border-box',
  backgroundColor: 'var(--background-color)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '30px 64px',
  overflow: 'auto',
  [breakpoints.down.xs]: {
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
  backgroundColor: 'var(--background-color)'
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

export const AccountLinkButtonWrapper = styled.div({
  display: 'flex',
  width: 'calc(100% - 66px)', // -66 because of wrapper padding
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  paddingRight: 64,
  boxSizing: 'border-box',
  bottom: 30,
  [breakpoints.down.xs]: {
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
    [breakpoints.down.xs]: {
      lineHeight: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  },
  ({ error }) => ({
    color: error ? 'var(--error-color)' : 'inherit'
  })
);

// ChildInfo styles
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

export const NavigationButtons = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  height: '100%'
});

export const Subtitle = styled.h3({
  fontFamily: 'Roboto',
  fontWeight: 400,
  fontSize: 22,
  margin: '0 5px 10px'
});

// GenericSignUp styles
export const CheckboxRow = styled.div({
  margin: 0,
  '@media (min-width: 600px)': {
    margin: 5
  }
});

export const FormFieldsContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%'
});

export const FormFieldsOptions = styled.div({
  marginTop: 20,
  display: 'flex',
  flexDirection: 'column'
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
    color: error ? 'var(--error-color)' : 'inherit'
  })
);

export const LinkButtonWrapper = styled.div({
  display: 'flex',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center'
});

// ParentSignUp styles
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
  backgroundColor: 'var(--background-color)',
  border: `0.5px solid ${rgba(255, 255, 255, 0.2)}`,
  borderRadius: 0,
  '@media (max-width: 420px)': {
    paddingBottom: '56px'
  }
});
