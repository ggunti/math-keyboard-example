import React, { Component } from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Text,
  Platform,
  StyleSheet,
  PixelRatio,
  NativeSyntheticEvent,
  TextInputSelectionChangeEventData,
} from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { MathWithText, MathKeyboard, MathInput } from '../common';

interface CommentsProps {
  message: string;
  setMessage: (message: string) => void;
  customKeyboard: {
    component?: string;
    initialProps?: {};
  };
  isKeyboardShown: boolean;
  onKeyboardResigned: () => void;
  toolbarButtons: { text: string; testID: string; onPress: () => any }[];
  onInputSelectionChange: (e: NativeSyntheticEvent<TextInputSelectionChangeEventData>) => void;
  inputRef: any;
  setInputRef: (ref: any) => void;
  comments: string[];
  onPressSend: () => void;
  onKeyboardItemSelected: (keyboardId: string, params: object) => void;
  modeButtons: string[];
  selectedModeIndex: number;
  updateSelectedModeIndex: (selectedModeIndex: number) => void;
}

const TrackInteractive = true;

class Comments extends Component<CommentsProps> {
  renderItem = ({ item }: { item: string }) => (
    <MathWithText
      mathWithText={item}
      mathBoxStyle={{ marginTop: 7 }}
      textStyle={{ fontSize: 14 }}
      config={{ ex: 8, inline: true }}
    />
  );

  renderWriteMode = () => (
    <FlatList
      keyExtractor={(_item, index) => index.toString()}
      data={this.props.comments}
      renderItem={this.renderItem}
      showsVerticalScrollIndicator={false}
      onEndReachedThreshold={0.1}
      style={{ display: this.props.selectedModeIndex === 0 ? 'flex' : 'none' }}
      keyboardDismissMode={TrackInteractive ? 'interactive' : 'none'}
    />
  );

  renderPreviewMode = () => (
    <ScrollView
      contentContainerStyle={styles.previewContainer}
      keyboardDismissMode={TrackInteractive ? 'interactive' : 'none'}
      showsVerticalScrollIndicator={false}
    >
      <MathWithText
        mathWithText={this.props.message}
        mathBoxStyle={{ marginTop: 7 }}
        textStyle={{ fontSize: 14 }}
        config={{ ex: 8, inline: true }}
      />
    </ScrollView>
  );

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <ButtonGroup
            onPress={this.props.updateSelectedModeIndex}
            selectedIndex={this.props.selectedModeIndex}
            buttons={this.props.modeButtons}
            containerStyle={{ marginBottom: 15 }}
          />
          {this.props.selectedModeIndex === 1 && this.renderPreviewMode()}
          {this.renderWriteMode()}
          <View style={styles.inputContainer}>
            <MathInput
              maxHeight={120}
              customKeyboard={this.props.customKeyboard}
              onKeyboardResigned={this.props.onKeyboardResigned}
              onInputSelectionChange={this.props.onInputSelectionChange}
              value={this.props.message}
              onChangeText={this.props.setMessage}
              inputStyle={styles.textInput}
              setInputRef={this.props.setInputRef}
              placeholder='Message'
              underlineColorAndroid='transparent'
            />
            <TouchableOpacity style={styles.sendButton} onPress={this.props.onPressSend}>
              <Text>Send</Text>
            </TouchableOpacity>
          </View>
          <MathKeyboard
            customKeyboard={this.props.customKeyboard}
            onKeyboardItemSelected={this.props.onKeyboardItemSelected}
            isKeyboardShown={this.props.isKeyboardShown}
            inputRef={this.props.inputRef}
            onKeyboardResigned={this.props.onKeyboardResigned}
            toolbarButtons={this.props.toolbarButtons}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default Comments;

const COLOR = '#F5FCFF';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: COLOR,
  },
  previewContainer: {
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...Platform.select({
      android: {
        marginBottom: 5,
      },
      ios: {
        marginBottom: 15,
      },
    }),
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 10,
    paddingTop: 2,
    paddingBottom: 5,
    fontSize: 16,
    backgroundColor: 'white',
    borderWidth: 0.5 / PixelRatio.get(),
    borderRadius: 18,
  },
  sendButton: {
    paddingRight: 15,
    paddingLeft: 15,
    alignSelf: 'center',
  },
});
