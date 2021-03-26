import styled from '@emotion/styled';
import { breakpoints } from '../../globals';

export const PageWrapper = styled.div({
  width: '100%',
  boxSizing: 'border-box',
  paddingTop: '64px',
  paddingLeft: '96px',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  backgroundColor: 'var(--background-color)',
  transition: 'padding 300ms ease',
  [breakpoints.down.xs]: {
    paddingLeft: 0
  }
});
