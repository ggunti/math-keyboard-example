import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Keyboard,
  Platform,
  StyleSheet,
  StyleProp,
  TextStyle,
  NativeSyntheticEvent,
  TextInputSelectionChangeEventData,
} from 'react-native';
// @ts-ignore
import { KeyboardAccessoryView } from 'react-native-keyboard-input';
// @ts-ignore
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';
import { KEYBOARDS } from '../constants';

const TrackInteractive = true;

interface MathInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onKeyboardItemSelected: (keyboardId: string, params: object) => void;
  onPressSend?: () => void;
  inputMaxHeight: number;
  inputPlaceholder: string;
  onInputSelectionChange: (e: NativeSyntheticEvent<TextInputSelectionChangeEventData>) => void;
  inputStyle?: StyleProp<TextStyle>;
}

interface MathInputState {
  customKeyboard: {
    component?: string;
    initialProps?: {};
  };
  keyboardAccessoryViewHeight: number;
  isKeyboardShown: boolean;
}

class MathInput extends Component<MathInputProps, MathInputState> {
  state = {
    customKeyboard: {
      component: undefined,
      initialProps: undefined,
    },
    keyboardAccessoryViewHeight: 0,
    isKeyboardShown: false,
  };

  inputRef = null;
  toolbarButtons = [
    {
      text: 'Text',
      testID: 'reset',
      onPress: () => this.resetKeyboardView(),
    },
    {
      text: 'Basic Math',
      testID: 'basicMath',
      onPress: () => this.showKeyboardView(KEYBOARDS.BASIC),
    },
    {
      text: 'Lowercase',
      testID: 'lowercase',
      onPress: () => this.showKeyboardView(KEYBOARDS.LOWERCASE),
    },
    {
      text: 'Uppercase',
      testID: 'uppercase',
      onPress: () => this.showKeyboardView(KEYBOARDS.UPPERCASE),
    },
    {
      text: 'Letter-Like Symbols',
      testID: 'letterLikeSymbols',
      onPress: () => this.showKeyboardView(KEYBOARDS.LETTER_LIKE_SYMBOLS),
    },
    {
      text: 'Common Binary Operators',
      testID: 'commonBinaryOperators',
      onPress: () => this.showKeyboardView(KEYBOARDS.COMMON_BINARY_OPERATORS),
    },
    {
      text: 'Common Relational Operators',
      testID: 'commonRelationalOperators',
      onPress: () => this.showKeyboardView(KEYBOARDS.COMMON_RELATIONAL_OPERATORS),
    },
    {
      text: 'Basic Nary Operators',
      testID: 'basicNaryOperators',
      onPress: () => this.showKeyboardView(KEYBOARDS.BASIC_NARY_OPERATORS),
    },
    {
      text: 'Advanced Binary Operators',
      testID: 'advancedBinaryOperatorsKeyboard',
      onPress: () => this.showKeyboardView(KEYBOARDS.ADVANCED_BINARY_OPERATORS),
    },
    {
      text: 'Advanced Relational Operators',
      testID: 'advancedRelationalOperators',
      onPress: () => this.showKeyboardView(KEYBOARDS.ADVANCED_RELATIONAL_OPERATORS),
    },
    {
      text: 'Arrows',
      testID: 'arrows',
      onPress: () => this.showKeyboardView(KEYBOARDS.ARROWS),
    },
    {
      text: 'Negated Relations',
      testID: 'negatedRelations',
      onPress: () => this.showKeyboardView(KEYBOARDS.NEGATED_RELATIONS),
    },
    {
      text: 'Scripts',
      testID: 'scripts',
      onPress: () => this.showKeyboardView(KEYBOARDS.SCRIPTS),
    },
    {
      text: 'Frakturs',
      testID: 'frakturs',
      onPress: () => this.showKeyboardView(KEYBOARDS.FRAKTURS),
    },
    {
      text: 'Double Struck',
      testID: 'doubleStruck',
      onPress: () => this.showKeyboardView(KEYBOARDS.DOUBLE_STRUCK),
    },
    {
      text: 'Geometry',
      testID: 'geometry',
      onPress: () => this.showKeyboardView(KEYBOARDS.GEOMETRY),
    },
    {
      text: 'Common Math',
      testID: 'commonMath',
      onPress: () => this.showKeyboardView(KEYBOARDS.COMMON_MATH),
    },
  ];

  componentDidMount() {
    Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
  }

  componentWillUnmount() {
    Keyboard.removeListener('keyboardDidShow', this.keyboardDidShow);
    Keyboard.removeListener('keyboardDidHide', this.keyboardDidHide);
  }

  keyboardDidShow = () => {
    const { isKeyboardShown } = this.state;
    if (!isKeyboardShown) {
      this.setState({ isKeyboardShown: true });
    }
  };

  keyboardDidHide = () => {
    this.setState({ isKeyboardShown: false });
  };

  onKeyboardResigned = () => {
    this.setState({ customKeyboard: {} });
  };

  resetKeyboardView = () => {
    this.setState({ customKeyboard: {}, isKeyboardShown: true });
  };

  showKeyboardView = (component: string) => {
    this.setState({
      customKeyboard: {
        component,
        initialProps: {},
      },
    });
  };

  setKeyboardAccessoryViewHeight = (height: number) => this.setState({ keyboardAccessoryViewHeight: height });

  keyboardAccessoryViewContent = () => (
    <View style={styles.keyboardContainer}>
      <View style={{ borderTopWidth: StyleSheet.hairlineWidth, borderColor: '#bbb' }} />

      <View style={styles.inputContainer}>
        <AutoGrowingTextInput
          maxHeight={this.props.inputMaxHeight}
          style={this.props.inputStyle}
          ref={(ref: any) => (this.inputRef = ref)}
          placeholder={this.props.inputPlaceholder}
          underlineColorAndroid='transparent'
          multiline={true}
          onBlur={Platform.OS === 'android' ? this.onKeyboardResigned : undefined}
          showSoftInputOnFocus={this.state.customKeyboard.component ? false : true} // available only on android
          onSelectionChange={this.props.onInputSelectionChange}
          value={this.props.value}
          onChangeText={this.props.onChangeText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={this.props.onPressSend}>
          <Text>Send</Text>
        </TouchableOpacity>
      </View>

      {(this.state.isKeyboardShown || this.state.customKeyboard.component) && (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} keyboardShouldPersistTaps='handled'>
          {this.toolbarButtons.map((button, index) => (
            <TouchableOpacity
              onPress={button.onPress}
              style={{ paddingHorizontal: 8, paddingBottom: 10 }}
              key={index}
              testID={button.testID}
            >
              <Text>{button.text}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );

  render() {
    return (
      <KeyboardAccessoryView
        renderContent={this.keyboardAccessoryViewContent}
        onHeightChanged={Platform.OS === 'ios' ? this.setKeyboardAccessoryViewHeight : undefined}
        trackInteractive={TrackInteractive}
        kbInputRef={this.inputRef}
        kbComponent={this.state.customKeyboard.component}
        kbInitialProps={this.state.customKeyboard.initialProps}
        onItemSelected={this.props.onKeyboardItemSelected}
        onKeyboardResigned={this.onKeyboardResigned}
        revealKeyboardInteractive
        // requiresSameParentToManageScrollView
        // addBottomView
        // bottomViewColor='red'
        // allowHitsOutsideBounds
      />
    );
  }
}

export { MathInput };

const COLOR = '#F5FCFF';

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  keyboardContainer: {
    ...Platform.select({
      ios: {
        flex: 1,
        backgroundColor: COLOR,
      },
    }),
  },
  sendButton: {
    paddingRight: 15,
    paddingLeft: 15,
    alignSelf: 'center',
  },
});
