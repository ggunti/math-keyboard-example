import React, { useCallback } from 'react';
import { View, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
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
import { KEYBOARD_VIEWS } from '../constants';

interface MathViewProps {
  keyboardId: string;
  symbols: string[];
}

const NR_SYMBOLS_PER_ROW = 5;

// console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
// console.disableYellowBox = true;

const MathView = React.memo((props: MathViewProps) => {
  const onButtonPress = useCallback(
    (symbol: string) => {
      KeyboardRegistry.onItemSelected(props.keyboardId, { symbol });
    },
    [props.keyboardId],
  );
  const renderButton = useCallback(
    (symbol: string) => (
      <View style={styles.button}>
        <TouchableOpacity onPress={() => onButtonPress(symbol)}>
          <MathWithText
            config={{ ex: 8, inline: false }}
            mathWithText={'$$' + symbol + '$$'}
            mathBoxStyle={styles.buttonLabel}
          />
        </TouchableOpacity>
      </View>
    ),
    [onButtonPress],
  );
  const renderItem = useCallback(({ item }: { item: string }) => renderButton(item), [renderButton]);
  const keyExtractor = useCallback((_item: string, index: number) => `__button${index}`, []);

  return (
    <FlatList
      data={props.symbols}
      numColumns={NR_SYMBOLS_PER_ROW}
      renderItem={renderItem}
      keyboardShouldPersistTaps='always'
      keyExtractor={keyExtractor}
      maxToRenderPerBatch={NR_SYMBOLS_PER_ROW}
      initialNumToRender={NR_SYMBOLS_PER_ROW}
    />
  );
});

const styles = StyleSheet.create({
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

const BasicMathView = React.memo(() => <MathView keyboardId={KEYBOARD_VIEWS.BASIC} symbols={basicMath} />);
const LowercaseView = React.memo(() => <MathView keyboardId={KEYBOARD_VIEWS.LOWERCASE} symbols={lowercase} />);
const UppercaseView = React.memo(() => <MathView keyboardId={KEYBOARD_VIEWS.UPPERCASE} symbols={uppercase} />);
const LetterLikeSymbolsView = React.memo(() => (
  <MathView keyboardId={KEYBOARD_VIEWS.LETTER_LIKE_SYMBOLS} symbols={letterLikeSymbols} />
));
const CommonBinaryOperatorsView = React.memo(() => (
  <MathView keyboardId={KEYBOARD_VIEWS.COMMON_BINARY_OPERATORS} symbols={commonBinaryOperators} />
));
const CommonRelationalOperatorsView = React.memo(() => (
  <MathView keyboardId={KEYBOARD_VIEWS.COMMON_RELATIONAL_OPERATORS} symbols={commonRelationalOperators} />
));
const BasicNaryOperatorsView = React.memo(() => (
  <MathView keyboardId={KEYBOARD_VIEWS.BASIC_NARY_OPERATORS} symbols={basicNaryOperators} />
));
const AdvancedBinaryOperatorsView = React.memo(() => (
  <MathView keyboardId={KEYBOARD_VIEWS.ADVANCED_BINARY_OPERATORS} symbols={advancedBinaryOperators} />
));
const AdvancedRelationalOperatorsView = React.memo(() => (
  <MathView keyboardId={KEYBOARD_VIEWS.ADVANCED_RELATIONAL_OPERATORS} symbols={advancedRelationalOperators} />
));
const ArrowsView = React.memo(() => <MathView keyboardId={KEYBOARD_VIEWS.ARROWS} symbols={arrows} />);
const NegatedRelationsView = React.memo(() => (
  <MathView keyboardId={KEYBOARD_VIEWS.NEGATED_RELATIONS} symbols={negatedRelations} />
));
const ScriptsView = React.memo(() => <MathView keyboardId={KEYBOARD_VIEWS.SCRIPTS} symbols={scripts} />);
const FraktursView = React.memo(() => <MathView keyboardId={KEYBOARD_VIEWS.FRAKTURS} symbols={frakturs} />);
const DoubleStruckView = React.memo(() => (
  <MathView keyboardId={KEYBOARD_VIEWS.DOUBLE_STRUCK} symbols={doubleStruck} />
));
const GeometryView = React.memo(() => <MathView keyboardId={KEYBOARD_VIEWS.GEOMETRY} symbols={geometry} />);
const CommonMathView = React.memo(() => <MathView keyboardId={KEYBOARD_VIEWS.COMMON_MATH} symbols={commonMath} />);

KeyboardRegistry.registerKeyboard(KEYBOARD_VIEWS.BASIC, () => BasicMathView);
KeyboardRegistry.registerKeyboard(KEYBOARD_VIEWS.LOWERCASE, () => LowercaseView);
KeyboardRegistry.registerKeyboard(KEYBOARD_VIEWS.UPPERCASE, () => UppercaseView);
KeyboardRegistry.registerKeyboard(KEYBOARD_VIEWS.LETTER_LIKE_SYMBOLS, () => LetterLikeSymbolsView);
KeyboardRegistry.registerKeyboard(KEYBOARD_VIEWS.COMMON_BINARY_OPERATORS, () => CommonBinaryOperatorsView);
KeyboardRegistry.registerKeyboard(KEYBOARD_VIEWS.COMMON_RELATIONAL_OPERATORS, () => CommonRelationalOperatorsView);
KeyboardRegistry.registerKeyboard(KEYBOARD_VIEWS.BASIC_NARY_OPERATORS, () => BasicNaryOperatorsView);
KeyboardRegistry.registerKeyboard(KEYBOARD_VIEWS.ADVANCED_BINARY_OPERATORS, () => AdvancedBinaryOperatorsView);
KeyboardRegistry.registerKeyboard(KEYBOARD_VIEWS.ADVANCED_RELATIONAL_OPERATORS, () => AdvancedRelationalOperatorsView);
KeyboardRegistry.registerKeyboard(KEYBOARD_VIEWS.ARROWS, () => ArrowsView);
KeyboardRegistry.registerKeyboard(KEYBOARD_VIEWS.NEGATED_RELATIONS, () => NegatedRelationsView);
KeyboardRegistry.registerKeyboard(KEYBOARD_VIEWS.SCRIPTS, () => ScriptsView);
KeyboardRegistry.registerKeyboard(KEYBOARD_VIEWS.FRAKTURS, () => FraktursView);
KeyboardRegistry.registerKeyboard(KEYBOARD_VIEWS.DOUBLE_STRUCK, () => DoubleStruckView);
KeyboardRegistry.registerKeyboard(KEYBOARD_VIEWS.GEOMETRY, () => GeometryView);
KeyboardRegistry.registerKeyboard(KEYBOARD_VIEWS.COMMON_MATH, () => CommonMathView);
