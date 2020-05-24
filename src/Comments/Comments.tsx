import React, { Component } from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  FlatList,
  StyleSheet,
  PixelRatio,
  NativeSyntheticEvent,
  TextInputSelectionChangeEventData,
} from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { MathWithText, MathInput } from '../common';

interface CommentsProps {
  message: string;
  setMessage: (message: string) => void;
  onInputSelectionChange: (e: NativeSyntheticEvent<TextInputSelectionChangeEventData>) => void;
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
      style={{ display: this.props.selectedModeIndex === 1 ? 'flex' : 'none' }}
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
          {this.renderPreviewMode()}
          {this.renderWriteMode()}
          <MathInput
            value={this.props.message}
            onChangeText={this.props.setMessage}
            onKeyboardItemSelected={this.props.onKeyboardItemSelected}
            onPressSend={this.props.onPressSend}
            inputMaxHeight={200}
            inputPlaceholder='Message'
            onInputSelectionChange={this.props.onInputSelectionChange}
            inputStyle={styles.textInput}
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
    flex: 1,
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    maxHeight: 200,
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
});
