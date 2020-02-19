import styled from '@emotion/styled';
import { breakpoints } from '../../globals';

export const TableWrapper = styled.div({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderLeft: '1px solid rgba(224, 224, 224, 1)',
  borderRight: '1px solid rgba(224, 224, 224, 1)'
});

export const CardInfo = styled.div({
  border: '1px solid rgba(224, 224, 224, 1)',
  padding: 14,
  marginBottom: 20
});

export const ActionButtons = styled.div({
  display: 'flex',
  justifyContent: 'space-between'
});

export const PageContent = styled.div({
  width: '100%',
  boxSizing: 'border-box',
  padding: '40px 132px 0 132px',
  [breakpoints.down.md]: {
    padding: '40px 40px 0 40px'
  },
  [breakpoints.down.xs]: {
    padding: '30px 20px 0 20px'
  },
  '@media (max-width: 340px)': {
    padding: '30px 0 0 0'
  }
});
