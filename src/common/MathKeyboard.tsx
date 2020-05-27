import React, { Component } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native';
// @ts-ignore
import { KeyboardAccessoryView } from 'react-native-keyboard-input';

const TrackInteractive = true;

interface MathKeyboardProps {
  customKeyboard: {
    component?: string;
    initialProps?: {};
  };
  onKeyboardItemSelected: (keyboardId: string, params: object) => void;
  isKeyboardShown: boolean;
  inputRef: any;
  onKeyboardResigned: () => void;
  toolbarButtons: { text: string; testID: string; onPress: () => any }[];
}

interface MathKeyboardState {
  keyboardAccessoryViewHeight: number;
}

class MathKeyboard extends Component<MathKeyboardProps, MathKeyboardState> {
  state = {
    keyboardAccessoryViewHeight: 0,
  };

  setKeyboardAccessoryViewHeight = (height: number) => this.setState({ keyboardAccessoryViewHeight: height });

  keyboardAccessoryViewContent = () => (
    <View style={styles.keyboardContainer}>
      {(this.props.isKeyboardShown || this.props.customKeyboard.component) &&
        this.props.inputRef &&
        this.props.inputRef.isFocused() && (
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} keyboardShouldPersistTaps='handled'>
            {this.props.toolbarButtons.map((button, index) => (
              <TouchableOpacity
                onPress={button.onPress}
                style={{ paddingHorizontal: 8, paddingVertical: 10 }}
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
    );
  }
}

export { MathKeyboard };

const COLOR = '#F5FCFF';

const styles = StyleSheet.create({
  keyboardContainer: {
    ...Platform.select({
      ios: {
        flex: 1,
        backgroundColor: COLOR,
      },
    }),
  },
});
