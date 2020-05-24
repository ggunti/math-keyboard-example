import React, { Component } from 'react';
import { NativeSyntheticEvent, TextInputSelectionChangeEventData } from 'react-native';
// @ts-ignore
import { KeyboardUtils } from 'react-native-keyboard-input';
import Comments from './Comments';

interface CommentsPageState {
  comments: string[];
  message: string;
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
    inputSelection: {
      start: 0,
      end: 0,
    },
    selectedModeIndex: 0,
  };

  onKeyboardItemSelected = (_keyboardId: string, params: object) => {
    const { message } = this.state;
    const { start, end } = this.state.inputSelection;
    // @ts-ignore
    const { symbol }: { symbol: string } = params;
    const newMessage = message.slice(0, start) + '$$' + symbol + '$$' + message.slice(end);
    this.setState({ message: newMessage });
  };

  onPressSend = () => {
    this.setState(prevState => ({ comments: [prevState.message, ...prevState.comments], message: '' }));
    KeyboardUtils.dismiss();
  };

  onInputSelectionChange = (e: NativeSyntheticEvent<TextInputSelectionChangeEventData>) => {
    this.setState({ inputSelection: e.nativeEvent.selection });
  };

  render() {
    return (
      <Comments
        message={this.state.message}
        setMessage={(message: string) => this.setState({ message })}
        onInputSelectionChange={this.onInputSelectionChange}
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
