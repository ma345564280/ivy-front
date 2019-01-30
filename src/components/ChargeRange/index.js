import React from 'react';
import {
  Input, Checkbox,
} from 'antd';

import { FormattedMessage } from 'umi/locale';


class ChargeRange extends React.Component {
  static getDerivedStateFromProps(nextProps) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      return {
        ...(nextProps.value || {}),
      };
    }
    return null;
  }

  constructor(props) {
    super(props);

    const value = props.value || {};
    this.state = {
      chargeMinimum: value.chargeMinimum || 0,
      chargeMaximum: value.chargeMaximum || 0,
      isNegotiable: value.isNegotiable || false,
    };
  }

  handleChargeMaximumChange = (e) => {
    const chargeMaximum = parseInt(e.target.value || 0, 10);
    if (Number.isNaN(chargeMaximum)) {
      return;
    }
    if (!('value' in this.props)) {
      this.setState({ chargeMaximum });
    }
    this.triggerChange({ chargeMaximum });
  }

  handleChargeMinimumChange = (e) => {
    const chargeMinimum = parseInt(e.target.value || 0, 10);
    if (Number.isNaN(chargeMinimum)) {
      return;
    }
    if (!('value' in this.props)) {
      this.setState({ chargeMinimum });
    }
    this.triggerChange({ chargeMinimum });
  }

  handleIsNegotiableChange = (e) => {
    const isNegotiable = e.target.checked;
    if (!('value' in this.props)) {
      this.setState({ isNegotiable });
    }
    this.triggerChange({ isNegotiable });
  }


  triggerChange = (changedValue) => {
    // Should provide an event to pass value to Form.
    // console.log(this.state, changedValue)

    const onChange = this.props.onChange;
    if (onChange) {
      // console.log('onchange')
      onChange(Object.assign({}, this.state, changedValue));
    }
  }

  render() {
    const { size } = this.props;
    const state = this.state;
    return (
      <span>
        <Input
          type="text"
          size={size}
          value={state.chargeMinimum}
          onChange={this.handleChargeMinimumChange}
          style={{ width: '25%', marginRight: '3%' }}
        />
        {'-'}
        <Input
          type="text"
          size={size}
          value={state.chargeMaximum}
          onChange={this.handleChargeMaximumChange}
          style={{ width: '25%', marginRight: '3%', marginLeft: '3%' }}
        />
        {'or'}
        <Checkbox onChange={this.handleIsNegotiableChange} style={{ width: '25%', marginRight: '3%', marginLeft: '3%' }}>
          <FormattedMessage id="form.radio.isNegotiable" />
        </Checkbox>
      </span>
    );
  }
}

export default ChargeRange;
