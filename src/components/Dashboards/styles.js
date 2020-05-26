import styled from '@emotion/styled';
import { breakpoints } from '../../globals';

export const PageWrapper = styled.div({
  width: '100%',
  boxSizing: 'border-box',
  paddingLeft: '96px',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  backgroundColor: 'var(--background-color)',
  [breakpoints.down.xs]: {
    paddingLeft: 0
  }
});
