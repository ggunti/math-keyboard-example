import * as React from 'react';
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Require cycle:'])
import CommentsPage from './Comments/Comments.page';

export default function App() {
  return <CommentsPage />;
}
