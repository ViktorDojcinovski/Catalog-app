import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';

import 'react-datepicker/dist/react-datepicker.css';

const DatePickerWrapper = styled.div`
  width: 22.5%;
  margin-right: 2.5%;
  float: left;
  label {
    display: block;
    padding-left: 10px;
    font-weight: bold;
  }
`;

const StyledDatePicker = styled(DatePicker)`
  float: left;
  margin-top: 10px;
  margin-right: 2.5%;
  border: transparent;
  border-bottom: 1px solid #ccc;
  padding: 4px 10px;
`;

export class CatalogDatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onDateChange(e);
  }

  render() {
    const { date, label } = this.props;
    return (
      <DatePickerWrapper>
        <label> {label} </label>
        <StyledDatePicker selected={date} onChange={this.handleChange} />
      </DatePickerWrapper>
    );
  }
}

CatalogDatePicker.propTypes = {
  date: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};
