import React, { Component, useMemo, useCallback } from 'react';
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

const MathWithText = React.memo((props: any) => {
  const renderer = useCallback((str: string, index: number) => {
    if (index % 2 === 0) {
      return (
        <Text key={index} style={[styles.text, props.textStyle]}>
          {str}
        </Text>
      );
    } else {
      return <MathView key={str} config={props.config} resizeMode='contain' math={str} />;
    }
  }, [props.config, props.textStyle]);
  const tree = useMemo(() => {
    const res = props.mathWithText.split(/\$\$/g);
    return res.map(renderer);
  }, [props.mathWithText]);

  return (
    <View style={[styles.mathBox, props.mathBoxStyle]}>
      {tree}
    </View>
  );

});

MathWithText.defaultProps = {
  config: {
    ex: 8,
    inline: true,
  },
};

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
