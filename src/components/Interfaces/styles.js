import styled from '@emotion/styled';

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
