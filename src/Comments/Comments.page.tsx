import React, { Component } from 'react';
// @ts-ignore
import { KeyboardUtils } from 'react-native-keyboard-input';
import Comments from './Comments';
import { KEYBOARDS } from '../constants';

interface CommentsPageState {
  comments: string[];
  message: string;
  customKeyboard: {
    component?: string;
    initialProps?: {};
  };
  keyboardAccessoryViewHeight: number;
  selectedModeIndex: number;
}

class CommentsPage extends Component<{}, CommentsPageState> {
  state = {
    comments: ['$$x^2 = 1$$, so $$x=\\pm 1$$', '$$x^2 = -1$$, so $$x=\\pm i$$'],
    message: '',
    customKeyboard: {
      component: undefined,
      initialProps: undefined,
    },
    keyboardAccessoryViewHeight: 0,
    selectedModeIndex: 0,
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

  onKeyboardItemSelected = (_keyboardId: string, params: object) => {
    // @ts-ignore
    const { symbol }: { symbol: string } = params;
    this.setState(prevState => ({ message: prevState.message + '$$' + symbol + '$$' }));
  };

  onKeyboardResigned = () => {
    this.resetKeyboardView();
  };

  resetKeyboardView = () => {
    this.setState({ customKeyboard: {} });
  };

  showKeyboardView = (component: string) => {
    this.setState({
      customKeyboard: {
        component,
        initialProps: {},
      },
    });
  };

  onPressSend = () => {
    this.setState(prevState => ({ comments: [prevState.message, ...prevState.comments], message: '' }));
    KeyboardUtils.dismiss();
  };

  render() {
    return (
      <Comments
        message={this.state.message}
        setMessage={(message: string) => this.setState({ message })}
        comments={this.state.comments}
        onPressSend={this.onPressSend}
        inputRef={this.inputRef}
        setInputRef={(ref: any) => (this.inputRef = ref)}
        toolbarButtons={this.toolbarButtons}
        customKeyboard={this.state.customKeyboard}
        onKeyboardItemSelected={this.onKeyboardItemSelected}
        onKeyboardResigned={this.onKeyboardResigned}
        resetKeyboardView={this.resetKeyboardView}
        setKeyboardAccessoryViewHeight={(height: number) => this.setState({ keyboardAccessoryViewHeight: height })}
        keyboardAccessoryViewHeight={this.state.keyboardAccessoryViewHeight}
        modeButtons={['Write Mode', 'Preview Mode']}
        selectedModeIndex={this.state.selectedModeIndex}
        updateSelectedModeIndex={(selectedModeIndex: number) => this.setState({ selectedModeIndex })}
      />
    );
  }
}

export default CommentsPage;
