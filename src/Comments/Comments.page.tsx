import React, { Component } from 'react';
import { Keyboard, NativeSyntheticEvent, TextInputSelectionChangeEventData } from 'react-native';
// @ts-ignore
import { KeyboardUtils } from 'react-native-keyboard-input';
import Comments from './Comments';
import { KEYBOARD_VIEWS } from '../constants';

interface CommentsPageState {
  comments: string[];
  message: string;
  customKeyboard: {
    component?: string;
    initialProps?: {};
  };
  isKeyboardShown: boolean;
  inputSelection: {
    start: number;
    end: number;
  };
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
    isKeyboardShown: false,
    inputSelection: {
      start: 0,
      end: 0,
    },
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
      onPress: () => this.showKeyboardView(KEYBOARD_VIEWS.BASIC),
    },
    {
      text: 'Lowercase',
      testID: 'lowercase',
      onPress: () => this.showKeyboardView(KEYBOARD_VIEWS.LOWERCASE),
    },
    {
      text: 'Uppercase',
      testID: 'uppercase',
      onPress: () => this.showKeyboardView(KEYBOARD_VIEWS.UPPERCASE),
    },
    {
      text: 'Letter-Like Symbols',
      testID: 'letterLikeSymbols',
      onPress: () => this.showKeyboardView(KEYBOARD_VIEWS.LETTER_LIKE_SYMBOLS),
    },
    {
      text: 'Common Binary Operators',
      testID: 'commonBinaryOperators',
      onPress: () => this.showKeyboardView(KEYBOARD_VIEWS.COMMON_BINARY_OPERATORS),
    },
    {
      text: 'Common Relational Operators',
      testID: 'commonRelationalOperators',
      onPress: () => this.showKeyboardView(KEYBOARD_VIEWS.COMMON_RELATIONAL_OPERATORS),
    },
    {
      text: 'Basic Nary Operators',
      testID: 'basicNaryOperators',
      onPress: () => this.showKeyboardView(KEYBOARD_VIEWS.BASIC_NARY_OPERATORS),
    },
    {
      text: 'Advanced Binary Operators',
      testID: 'advancedBinaryOperatorsKeyboard',
      onPress: () => this.showKeyboardView(KEYBOARD_VIEWS.ADVANCED_BINARY_OPERATORS),
    },
    {
      text: 'Advanced Relational Operators',
      testID: 'advancedRelationalOperators',
      onPress: () => this.showKeyboardView(KEYBOARD_VIEWS.ADVANCED_RELATIONAL_OPERATORS),
    },
    {
      text: 'Arrows',
      testID: 'arrows',
      onPress: () => this.showKeyboardView(KEYBOARD_VIEWS.ARROWS),
    },
    {
      text: 'Negated Relations',
      testID: 'negatedRelations',
      onPress: () => this.showKeyboardView(KEYBOARD_VIEWS.NEGATED_RELATIONS),
    },
    {
      text: 'Scripts',
      testID: 'scripts',
      onPress: () => this.showKeyboardView(KEYBOARD_VIEWS.SCRIPTS),
    },
    {
      text: 'Frakturs',
      testID: 'frakturs',
      onPress: () => this.showKeyboardView(KEYBOARD_VIEWS.FRAKTURS),
    },
    {
      text: 'Double Struck',
      testID: 'doubleStruck',
      onPress: () => this.showKeyboardView(KEYBOARD_VIEWS.DOUBLE_STRUCK),
    },
    {
      text: 'Geometry',
      testID: 'geometry',
      onPress: () => this.showKeyboardView(KEYBOARD_VIEWS.GEOMETRY),
    },
    {
      text: 'Common Math',
      testID: 'commonMath',
      onPress: () => this.showKeyboardView(KEYBOARD_VIEWS.COMMON_MATH),
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

  onKeyboardItemSelected = (_keyboardId: string, params: object) => {
    const { message } = this.state;
    const { start, end } = this.state.inputSelection;
    // @ts-ignore
    const { symbol }: { symbol: string } = params;
    const leftMsgSlice = message.slice(0, start);
    const rightMsgSlice = message.slice(end);
    let newSymbol = symbol;
    if ((leftMsgSlice.match(/\$\$/g) || []).length % 2 === 0) {
      newSymbol = '$$' + symbol + '$$';
    }
    this.setState({ message: leftMsgSlice + newSymbol + rightMsgSlice });
  };

  onInputSelectionChange = (e: NativeSyntheticEvent<TextInputSelectionChangeEventData>) => {
    this.setState({ inputSelection: e.nativeEvent.selection });
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
        customKeyboard={this.state.customKeyboard}
        isKeyboardShown={this.state.isKeyboardShown}
        onKeyboardResigned={this.onKeyboardResigned}
        toolbarButtons={this.toolbarButtons}
        onInputSelectionChange={this.onInputSelectionChange}
        inputRef={this.inputRef}
        setInputRef={(ref: any) => (this.inputRef = ref)}
        comments={this.state.comments}
        onPressSend={this.onPressSend}
        onKeyboardItemSelected={this.onKeyboardItemSelected}
        modeButtons={['Write Mode', 'Preview Mode']}
        selectedModeIndex={this.state.selectedModeIndex}
        updateSelectedModeIndex={(selectedModeIndex: number) => this.setState({ selectedModeIndex })}
      />
    );
  }
}

export default CommentsPage;
