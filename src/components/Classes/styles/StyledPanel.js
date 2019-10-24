import styled from '@emotion/styled';

export const PanelContainer = styled.div({
  width: '50%',
  minWidth: 700,
  margin: '10px 0',
  '& .MuiExpansionPanelSummary-content': {
    justifyContent: 'space-between'
  },
  '& .MuiExpansionPanelDetails-root': {
    flexWrap: 'wrap'
  }
});

export const ClassTitle = styled.h3({
  margin: 0
});

export const ClassInfo = styled.div({
  display: 'flex',
  flexDirection: 'column'
});

export const ClassLocation = styled.div({
  display: 'flex',
  margin: '20px 0 5px'
});

export const LocationDetails = styled.div({
  display: 'flex',
  flexDirection: 'column',
  marginLeft: 5
});

export const TableWrapper = styled.div({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderLeft: '1px solid rgba(224, 224, 224, 1)',
  borderRight: '1px solid rgba(224, 224, 224, 1)'
});

export const ButtonWrapper = styled.div({
  marginTop: 15,
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-end'
});
