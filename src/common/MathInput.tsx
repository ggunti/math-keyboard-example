import React from 'react';
import {
  TextInput,
  Platform,
  StyleProp,
  TextStyle,
  NativeSyntheticEvent,
  TextInputSelectionChangeEventData,
} from 'react-native';

interface MathInputProps {
  customKeyboard: {
    component?: string;
    initialProps?: {};
  };
  onKeyboardResigned: () => void;
  onInputSelectionChange: (e: NativeSyntheticEvent<TextInputSelectionChangeEventData>) => void;
  value: string;
  onChangeText: (text: string) => void;
  inputStyle?: StyleProp<TextStyle>;
  setInputRef: (ref: any) => void;
  placeholder?: string;
  underlineColorAndroid?: string;
}

const MathInput: React.FC<MathInputProps> = props => (
  <TextInput
    style={props.inputStyle}
    ref={props.setInputRef}
    placeholder={props.placeholder}
    underlineColorAndroid={props.underlineColorAndroid}
    multiline={true}
    onBlur={Platform.OS === 'android' ? props.onKeyboardResigned : undefined}
    // @ts-ignore
    showSoftInputOnFocus={props.customKeyboard.component ? false : true} // available only on android
    onSelectionChange={props.onInputSelectionChange}
    value={props.value}
    onChangeText={props.onChangeText}
  />
);

MathInput.defaultProps = {
  underlineColorAndroid: 'transparent',
};

export { MathInput };
