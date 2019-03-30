import React from 'react';
import { View, Text,Animated,Image } from "react-native";
export default class Loading extends React.Component {
  constructor(props){
    super(props);
    this.loadingSpin = new Animated.Value(0);
  }

  spinAnimation(){
    this.loadingSpin.setValue(0);

  Animated.timing(
    this.loadingSpin,
      {
        toValue:1,
        duration: 500,
      }
    ).start(()=>this.spinAnimation());
  }

  componentDidMount(){
    this.spinAnimation();
  }
  render() {
    const spin=this.loadingSpin.interpolate({
      inputRange: [0,1],
      outputRange: ['0deg','360deg']
    })
    return (
      <View style={{opacity:(this.props.show)? 1 : 0}}>
        {/* <Animated.Text style={{ transform: [{rotate: spin}]}}>
          Loading...
        </Animated.Text> */}
        <Animated.Image style={{transform: [{rotate: spin}] ,height:70, width:70}} source={require('./imgs/loading.png')} />
      </View>
    );
  }
}
