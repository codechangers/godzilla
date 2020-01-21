import React from 'react';
import PropTypes from 'prop-types';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LocationIcon from '@material-ui/icons/LocationOn';
import { getDate, getTime, getWeekDays, calcSessions } from '../../helpers';
import '../../assets/css/Parent-Dash.css';
import * as Styled from './styles';

const StyledTableCell = withStyles({
  head: {
    backgroundColor: 'rgba(224, 224, 224, 1)'
  }
})(TableCell);

const ClassPanel = ({ cls, getButton }) => {
  return (
    <Styled.PanelContainer>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Styled.ClassInfo>
            <Styled.ClassTitle>{cls.name}</Styled.ClassTitle>
            <Styled.ClassLocation>
              <LocationIcon />
              <Styled.LocationDetails>
                <div>{cls.locationName}</div>
                <div>{cls.locationAddress}</div>
              </Styled.LocationDetails>
            </Styled.ClassLocation>
          </Styled.ClassInfo>
          <div>{`${getDate(cls.startDate)} - ${getDate(cls.endDate)}`}</div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Styled.TableWrapper>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>AGE</StyledTableCell>
                  <StyledTableCell>START DATE</StyledTableCell>
                  <StyledTableCell>{cls.daysOfWeek.length > 1 ? 'DAYS' : 'DAY'}</StyledTableCell>
                  <StyledTableCell>TIME</StyledTableCell>
                  <StyledTableCell>SESSIONS</StyledTableCell>
                  <StyledTableCell align="right">COST</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row">
                    {`${cls.startAge} - ${cls.endAge}`}
                  </TableCell>
                  <TableCell>{`${getDate(cls.startDate)}`}</TableCell>
                  <TableCell>{getWeekDays(cls.daysOfWeek)}</TableCell>
                  <TableCell>{getTime(cls.startTime)}</TableCell>
                  <TableCell>{calcSessions(cls)}</TableCell>
                  <TableCell align="right">{`$${cls.price}`}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Styled.TableWrapper>
          <Styled.ButtonWrapper>{getButton(cls)}</Styled.ButtonWrapper>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Styled.PanelContainer>
  );
};

ClassPanel.propTypes = {
  cls: PropTypes.object.isRequired,
  getButton: PropTypes.func.isRequired
};

export default ClassPanel;
