import React, { Component } from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  FlatList,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
  PixelRatio,
} from 'react-native';
import { ButtonGroup } from 'react-native-elements';
// @ts-ignore
import { KeyboardAccessoryView } from 'react-native-keyboard-input';
// @ts-ignore
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';
import { MathWithText } from '../common';

interface CommentsProps {
  message: string;
  setMessage: (message: string) => void;
  comments: string[];
  onPressSend: () => void;
  inputRef: any;
  setInputRef: (ref: any) => void;
  toolbarButtons: { text: string; testID: string; onPress: () => any }[];
  isKeyboardShown: boolean;
  customKeyboard: { component?: string; initialProps?: { title: string } };
  onKeyboardItemSelected: (keyboardId: string, params: object) => void;
  onKeyboardResigned: () => void;
  setKeyboardAccessoryViewHeight: (height: number) => void;
  keyboardAccessoryViewHeight: number;
  modeButtons: string[];
  selectedModeIndex: number;
  updateSelectedModeIndex: (selectedModeIndex: number) => void;
}

const TrackInteractive = true;

class Comments extends Component<CommentsProps> {
  keyboardAccessoryViewContent = () => {
    return (
      <View style={styles.keyboardContainer}>
        <View style={{ borderTopWidth: StyleSheet.hairlineWidth, borderColor: '#bbb' }} />

        <View style={styles.inputContainer}>
          <AutoGrowingTextInput
            maxHeight={200}
            style={styles.textInput}
            ref={this.props.setInputRef}
            placeholder='Message'
            underlineColorAndroid='transparent'
            onBlur={Platform.OS === 'android' ? this.props.onKeyboardResigned : undefined}
            showSoftInputOnFocus={this.props.customKeyboard.component ? false : true} // available only on android
            value={this.props.message}
            onChangeText={this.props.setMessage}
          />
          <TouchableOpacity style={styles.sendButton} onPress={this.props.onPressSend}>
            <Text>Send</Text>
          </TouchableOpacity>
        </View>
        {(this.props.isKeyboardShown || this.props.customKeyboard.component) && (
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} keyboardShouldPersistTaps='handled'>
            {this.props.toolbarButtons.map((button, index) => (
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
  };

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
          <KeyboardAccessoryView
            renderContent={this.keyboardAccessoryViewContent}
            onHeightChanged={Platform.OS === 'ios' ? this.props.setKeyboardAccessoryViewHeight : undefined}
            trackInteractive={TrackInteractive}
            kbInputRef={this.props.inputRef}
            kbComponent={this.props.customKeyboard.component}
            kbInitialProps={this.props.customKeyboard.initialProps}
            onItemSelected={this.props.onKeyboardItemSelected}
            onKeyboardResigned={this.props.onKeyboardResigned}
            revealKeyboardInteractive
            // requiresSameParentToManageScrollView
            // addBottomView
            // bottomViewColor='red'
            // allowHitsOutsideBounds
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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    paddingTop: 50,
    paddingBottom: 50,
  },
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
  sendButton: {
    paddingRight: 15,
    paddingLeft: 15,
    alignSelf: 'center',
  },
});
