import { Select, Row, Col } from 'antd';
import React from 'react';

const { Option } = Select;
const provinceData = ['浙江', '江苏'];
const cityData = {
  浙江: ['杭州', '宁波', '温州'],
  江苏: ['南京', '苏州', '镇江'],
};

export  default  class index extends React.Component {

  state = {
    cities: cityData[provinceData[0]],
    secondCity: cityData[provinceData[0]][0],
  }

  handleProvinceChange = (value) => {
    this.setState({
      cities: cityData[value],
      secondCity: cityData[value][0],
    });
  }

  onSecondCityChange = (value) => {
    this.setState({
      secondCity: value,
    });
  }

  render() {
    const { cities , secondCity} = this.state;
    return (

      <div>
        <Row type="flex" justify="space-around">
          <Col span={12}>
            <Select
              defaultValue={provinceData[0]}
              onChange={this.handleProvinceChange}
            >
              {provinceData.map(province => <Option key={province}>{province}</Option>)}
            </Select>
          </Col>
          <Col span={12}>
            <Select
              style={{ padding: [5,0,0,0]}}
              value={secondCity}
              onChange={this.onSecondCityChange}
            >
              {cities.map(city => <Option key={city}>{city}</Option>)}
            </Select>
          </Col>
        </Row>
      </div>
    );
  }
}
