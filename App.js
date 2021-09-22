import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Article from './src/components/Article';
import News from './src/components/News';
export default function App() {
  return (
    <View style={styles.container}>
     <News/>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff'
	}
});
