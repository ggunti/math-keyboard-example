import React from 'react';
import { Platform, StyleProp, TextStyle, NativeSyntheticEvent, TextInputSelectionChangeEventData } from 'react-native';
// @ts-ignore
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';

interface MathInputProps {
  customKeyboard: {
    component?: string;
    initialProps?: {};
  };
  onKeyboardResigned: () => void;
  onInputSelectionChange: (e: NativeSyntheticEvent<TextInputSelectionChangeEventData>) => void;
  value: string;
  onChangeText: (text: string) => void;
  maxHeight: number;
  inputStyle?: StyleProp<TextStyle>;
  setInputRef: (ref: any) => void;
  placeholder?: string;
  underlineColorAndroid?: string;
}

const MathInput: React.FC<MathInputProps> = props => (
  <AutoGrowingTextInput
    maxHeight={props.maxHeight}
    style={props.inputStyle}
    ref={props.setInputRef}
    placeholder={props.placeholder}
    underlineColorAndroid={props.underlineColorAndroid}
    multiline={true}
    onBlur={Platform.OS === 'android' ? props.onKeyboardResigned : undefined}
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
