import React, { Component } from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import MathView from 'react-native-math-view';

interface MathWithTextProps {
  mathWithText: string;
  mathBoxStyle?: ViewStyle;
  textStyle?: TextStyle;
  config: {
    ex: number;
    inline: boolean;
  };
}

class MathWithText extends Component<MathWithTextProps> {
  static defaultProps = {
    config: {
      ex: 8,
      inline: true,
    },
  };

  render() {
    const res = this.props.mathWithText.split(/\$\$/g);
    return (
      <View style={[styles.mathBox, this.props.mathBoxStyle]}>
        {res.map((str, index) => {
          if (index % 2 === 0) {
            return (
              <Text key={index} style={[styles.text, this.props.textStyle]}>
                {str}
              </Text>
            );
          } else {
            return <MathView key={index} config={this.props.config} resizeMode='contain' math={str} />;
          }
        })}
      </View>
    );
  }
}

export { MathWithText };

const styles = StyleSheet.create({
  mathBox: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  text: {
    flexWrap: 'wrap',
    fontSize: 18,
  },
});
