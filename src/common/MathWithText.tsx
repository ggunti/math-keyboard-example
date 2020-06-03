import React, { useMemo, useCallback } from 'react';
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

const MathWithText = React.memo((props: MathWithTextProps) => {
  const renderer = useCallback(
    (str: string, index: number) => {
      if (index % 2 === 0) {
        const rows = str.split(/(\n)/);
        if (rows.length > 1 && rows[rows.length - 1] === '') {
          rows.pop();
        }
        return rows.map((val: string, i: number) =>
          val === '\n' ? ( // insert new line
            <View key={`${index}${i}`} style={{ width: '100%' }} />
          ) : (
            <Text key={`${index}${i}`} style={[styles.text, props.textStyle]}>
              {val}
            </Text>
          ),
        );
      } else {
        return <MathView key={index} config={props.config} resizeMode='contain' math={str} />;
      }
    },
    [props.config, props.textStyle],
  );
  const tree = useMemo(() => {
    const res = props.mathWithText.split(/\$\$/g);
    return res.map(renderer);
  }, [props.mathWithText, renderer]);

  return <View style={[styles.mathBox, props.mathBoxStyle]}>{tree}</View>;
});

// @ts-ignore
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
    textAlign: 'center',
    fontSize: 18,
  },
});
