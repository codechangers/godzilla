import styled from '@emotion/styled';
import { rgba } from '../../utils/helpers';

export const TableWrapper = styled.div({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderLeft: `1px solid ${rgba(224, 224, 224, 1)}`,
  borderRight: `1px solid ${rgba(224, 224, 224, 1)}`
});

export const ButtonWrapper = styled.div({
  marginTop: 15,
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-end'
});
