/* eslint-disable no-bitwise */
/* eslint-disable react-native/no-inline-styles */
import 'react-native-gesture-handler';
import React from 'react';
import {AppRegistry, View, useWindowDimensions} from 'react-native';
import {LongPressGestureHandler, State} from 'react-native-gesture-handler';
import {name as appName} from './app.json';

const App = () => {
  const {width, height} = useWindowDimensions();
  const [x, setX] = React.useState(undefined);
  const [y, setY] = React.useState(undefined);
  const yRows = 20;
  const xRows = 10;

  const backgroundContent = Array.from(new Array(yRows), (_, yPos) => (
    <View key={yPos} style={{flex: 1, flexDirection: 'row'}}>
      {Array.from(new Array(xRows), (__, xPos) => {
        const isActive = xPos === x && yPos === y;
        const backgroundColor = isActive ? '#eee' : 'white';

        return <View key={xPos} style={{flex: 1, backgroundColor}} />;
      })}
    </View>
  ));

  return (
    <LongPressGestureHandler
      onGestureEvent={(e) => {
        setX(((e.nativeEvent.x * xRows) / width) | 0);
        setY(((e.nativeEvent.y * yRows) / height) | 0);
      }}
      onHandlerStateChange={(e) => {
        if (e.nativeEvent.state === State.END) {
          setX(undefined);
          setY(undefined);
        }
      }}
      minDurationMs={0}
      maxDist={1e9}
      shouldCancelWhenOutside={false}>
      <View style={{flex: 1}}>{backgroundContent}</View>
    </LongPressGestureHandler>
  );
};

AppRegistry.registerComponent(appName, () => App);
