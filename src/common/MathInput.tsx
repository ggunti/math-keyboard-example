import React, { Component } from 'react';
import {
  TextInput,
  Platform,
  StyleProp,
  TextStyle,
  NativeSyntheticEvent,
  TextInputSelectionChangeEventData,
  TextInputContentSizeChangeEventData,
} from 'react-native';

interface MathInputProps {
  maxHeight: number;
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

interface MathInputState {
  height: number | undefined;
}

class MathInput extends Component<MathInputProps, MathInputState> {
  state = {
    height: undefined,
  };

  static defaultProps = {
    underlineColorAndroid: 'transparent',
  };

  onContentSizeChange = (e: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) => {
    const { maxHeight } = this.props;
    const { height } = e.nativeEvent.contentSize;
    this.setState({ height: Math.min(height, maxHeight) });
  };

  render() {
    const { height } = this.state;
    return (
      <TextInput
        style={[this.props.inputStyle, { height }]}
        ref={this.props.setInputRef}
        placeholder={this.props.placeholder}
        underlineColorAndroid={this.props.underlineColorAndroid}
        multiline={true}
        onBlur={Platform.OS === 'android' ? this.props.onKeyboardResigned : undefined}
        // @ts-ignore
        showSoftInputOnFocus={this.props.customKeyboard.component ? false : true} // available only on android
        onSelectionChange={this.props.onInputSelectionChange}
        value={this.props.value}
        onChangeText={this.props.onChangeText}
        onContentSizeChange={this.onContentSizeChange}
      />
    );
  }
}

export { MathInput };
