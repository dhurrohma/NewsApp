import React, { Component} from "react";
import { StyleSheet, View } from "react-native";;
import AnimatedLottieView from "lottie-react-native";
import { StackActions } from "@react-navigation/native";

class SplashScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.dispatch(StackActions.replace('Home'));
        }, 5000);
    }
    
    render() {
      return (
        <View style={styles.container}>
          <AnimatedLottieView
            source={require('../assets/blue-stars.json')}
            autoPlay
            loop
            style={styles.animation}
          />
        </View>
      );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#eef4f7'
    },
    animation: {
        width: "50%"
    },
    
});

export default SplashScreen;