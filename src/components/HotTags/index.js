import React  from 'react';
import { Tag } from 'antd';

const CheckableTag = Tag.CheckableTag;

class HotTags extends React.Component {
  state = {
    selectedTags: [],
  };

  handleChange(tag, checked) {
    const { selectedTags } = this.state;
    const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
    console.log('You are interested in: ', nextSelectedTags);
    this.setState({ selectedTags: nextSelectedTags });
    this.triggerChange({ nextSelectedTags });
  }

  triggerChange = (changedValue) => {
    // Should provide an event to pass value to Form.
    // console.log(this.state, changedValue)

    const onChange = this.props.onChange;
    if (onChange) {
      onChange(changedValue.nextSelectedTags);
    }
  }

  render() {
    const { selectedTags } = this.state;
    const { tagsProps } = this.props;
    return (
      <div>
        {tagsProps.map(tag => (
          <CheckableTag
            key={tag}
            checked={selectedTags.indexOf(tag) > -1}
            onChange={checked => this.handleChange(tag, checked)}
          >
            {tag}
          </CheckableTag>
        ))}
      </div>
    );
  }
}

export default HotTags;
