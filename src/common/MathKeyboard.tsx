import React, { Component, useCallback, useMemo } from 'react';
import { View, TouchableOpacity, ScrollView, StyleSheet, FlatList } from 'react-native';
// @ts-ignore
import { KeyboardRegistry } from 'react-native-keyboard-input';
import { MathWithText } from './MathWithText';
import {
  basicMath,
  lowercase,
  uppercase,
  letterLikeSymbols,
  commonBinaryOperators,
  commonRelationalOperators,
  basicNaryOperators,
  advancedBinaryOperators,
  advancedRelationalOperators,
  arrows,
  negatedRelations,
  scripts,
  frakturs,
  doubleStruck,
  geometry,
  commonMath,
} from '../constants/mathSymbols';
import { KEYBOARDS } from '../constants';

interface MathKeyboardProps {
  keyboardId: string;
  symbols: string[];
}

const NR_SYMBOLS_PER_ROW = 5;

// console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
// console.disableYellowBox = true;

const MathKeyboard = React.memo((props: any) => {
  const onButtonPress = useCallback((symbol: string) => {
    KeyboardRegistry.onItemSelected(props.keyboardId, { symbol });
  }, [props.keyboardId]);
  const renderButton = useCallback((symbol: string, key: string) => (
    <View key={key} style={styles.button}>
      <TouchableOpacity onPress={() => onButtonPress(symbol)}>
        <MathWithText
          config={{ ex: 8, inline: false }}
          mathWithText={'$$' + symbol + '$$'}
          mathBoxStyle={styles.buttonLabel}
        />
      </TouchableOpacity>
    </View>
  ), [onButtonPress]);
  const renderRow = useCallback(({ item: row, index: rowIndex }: { item: string[], index: number }) => {
    return (
      <View key={`__row${rowIndex}`} style={styles.row}>
        {row.map((symbol, index) => renderButton(symbol, `__button${rowIndex}${index}`))}
      </View>
    )
  }, [renderButton]);
  const rows = useMemo(() => {
    const { symbols } = props;
    const rows: string[][] = [[]];
    let i = 0;
    let j = 0;
    while (i < symbols.length) {
      rows[j].push(symbols[i]);
      if ((i + 1) % NR_SYMBOLS_PER_ROW === 0) {
        rows.push([]);
        j++;
      }
      i++;
    }
    return rows;
  }, [props.symbols]);
  const keyExtractor = useCallback((item, index) => `row${index}`, []);
  return <FlatList
    data={rows}
    renderItem={renderRow}
    //contentContainerStyle={styles.keyboardContainer}
    keyboardShouldPersistTaps='always'
    keyExtractor={keyExtractor}
    maxToRenderPerBatch={10}
    initialNumToRender={20}
  />
})

const styles = StyleSheet.create({
  keyboardContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  button: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLabel: {
    padding: 10,
    textAlign: 'center',
    paddingTop: 13,
    paddingBottom: 13,
    fontSize: 20,
  },
});

const BasicMathKeyboard = React.memo(() => <MathKeyboard keyboardId={KEYBOARDS.BASIC} symbols={basicMath} />);
const LowercaseKeyboard = React.memo(() => <MathKeyboard keyboardId={KEYBOARDS.LOWERCASE} symbols={lowercase} />);
const UppercaseKeyboard = React.memo(() => <MathKeyboard keyboardId={KEYBOARDS.UPPERCASE} symbols={uppercase} />);
const LetterLikeSymbolsKeyboard = React.memo(() => (
  <MathKeyboard keyboardId={KEYBOARDS.LETTER_LIKE_SYMBOLS} symbols={letterLikeSymbols} />
));
const CommonBinaryOperatorsKeyboard = React.memo(() => (
  <MathKeyboard keyboardId={KEYBOARDS.COMMON_BINARY_OPERATORS} symbols={commonBinaryOperators} />
));
const CommonRelationalOperatorsKeyboard = React.memo(() => (
  <MathKeyboard keyboardId={KEYBOARDS.COMMON_RELATIONAL_OPERATORS} symbols={commonRelationalOperators} />
));
const BasicNaryOperatorsKeyboard = React.memo(() => (
  <MathKeyboard keyboardId={KEYBOARDS.BASIC_NARY_OPERATORS} symbols={basicNaryOperators} />
));
const AdvancedBinaryOperatorsKeyboard = React.memo(() => (
  <MathKeyboard keyboardId={KEYBOARDS.ADVANCED_BINARY_OPERATORS} symbols={advancedBinaryOperators} />
));
const AdvancedRelationalOperatorsKeyboard = React.memo(() => (
  <MathKeyboard keyboardId={KEYBOARDS.ADVANCED_RELATIONAL_OPERATORS} symbols={advancedRelationalOperators} />
));
const ArrowsKeyboard = React.memo(() => <MathKeyboard keyboardId={KEYBOARDS.ARROWS} symbols={arrows} />);
const NegatedRelationsKeyboard = React.memo(() => (
  <MathKeyboard keyboardId={KEYBOARDS.NEGATED_RELATIONS} symbols={negatedRelations} />
));
const ScriptsKeyboard = React.memo(() => <MathKeyboard keyboardId={KEYBOARDS.SCRIPTS} symbols={scripts} />);
const FraktursKeyboard = React.memo(() => <MathKeyboard keyboardId={KEYBOARDS.FRAKTURS} symbols={frakturs} />);
const DoubleStruckKeyboard = React.memo(() => (
  <MathKeyboard keyboardId={KEYBOARDS.DOUBLE_STRUCK} symbols={doubleStruck} />
));
const GeometryKeyboard = React.memo(() => <MathKeyboard keyboardId={KEYBOARDS.GEOMETRY} symbols={geometry} />);
const CommonMathKeyboard = React.memo(() => <MathKeyboard keyboardId={KEYBOARDS.COMMON_MATH} symbols={commonMath} />);

KeyboardRegistry.registerKeyboard(KEYBOARDS.BASIC, () => BasicMathKeyboard);
KeyboardRegistry.registerKeyboard(KEYBOARDS.LOWERCASE, () => LowercaseKeyboard);
KeyboardRegistry.registerKeyboard(KEYBOARDS.UPPERCASE, () => UppercaseKeyboard);
KeyboardRegistry.registerKeyboard(KEYBOARDS.LETTER_LIKE_SYMBOLS, () => LetterLikeSymbolsKeyboard);
KeyboardRegistry.registerKeyboard(KEYBOARDS.COMMON_BINARY_OPERATORS, () => CommonBinaryOperatorsKeyboard);
KeyboardRegistry.registerKeyboard(KEYBOARDS.COMMON_RELATIONAL_OPERATORS, () => CommonRelationalOperatorsKeyboard);
KeyboardRegistry.registerKeyboard(KEYBOARDS.BASIC_NARY_OPERATORS, () => BasicNaryOperatorsKeyboard);
KeyboardRegistry.registerKeyboard(KEYBOARDS.ADVANCED_BINARY_OPERATORS, () => AdvancedBinaryOperatorsKeyboard);
KeyboardRegistry.registerKeyboard(KEYBOARDS.ADVANCED_RELATIONAL_OPERATORS, () => AdvancedRelationalOperatorsKeyboard);
KeyboardRegistry.registerKeyboard(KEYBOARDS.ARROWS, () => ArrowsKeyboard);
KeyboardRegistry.registerKeyboard(KEYBOARDS.NEGATED_RELATIONS, () => NegatedRelationsKeyboard);
KeyboardRegistry.registerKeyboard(KEYBOARDS.SCRIPTS, () => ScriptsKeyboard);
KeyboardRegistry.registerKeyboard(KEYBOARDS.FRAKTURS, () => FraktursKeyboard);
KeyboardRegistry.registerKeyboard(KEYBOARDS.DOUBLE_STRUCK, () => DoubleStruckKeyboard);
KeyboardRegistry.registerKeyboard(KEYBOARDS.GEOMETRY, () => GeometryKeyboard);
KeyboardRegistry.registerKeyboard(KEYBOARDS.COMMON_MATH, () => CommonMathKeyboard);
