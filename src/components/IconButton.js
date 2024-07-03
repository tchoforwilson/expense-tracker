import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from './Icon';

const IconButton = ({src, size, tintColor, iconStyle, ...otherProps}) => {
  return (
    <TouchableOpacity {...otherProps}>
      <Icon name={src} size={size} tintColor={tintColor} style={iconStyle} />
    </TouchableOpacity>
  );
};

export default IconButton;
