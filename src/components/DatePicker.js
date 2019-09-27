import React from 'react';
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

class CatalogueDatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onDateChange(e);
  }

  render() {
    const date = this.props.date;
    return (
      <DatePickerWrapper>
        <label> {this.props.label} </label>
        <StyledDatePicker selected={date} onChange={this.handleChange} />
      </DatePickerWrapper>
    );
  }
}

export default CatalogueDatePicker;
