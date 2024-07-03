import React from 'react';
import {Image} from 'react-native';

const Icon = ({name, size, tintColor}) => {
  return <Image source={name} style={{width: size, height: size, tintColor}} />;
};

export default Icon;
