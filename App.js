/* export default class App extends Component<{}> {
    constructor(){
        super();
        this.state = {
          thought: '124'
        }

    }
      handleClick = thought => {
      fetch('http://192.168.1.237:3000/thoughts')
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          thought: JSON.stringify(res[Math.round(Math.random()*(3-1))].name)
        });     
      })
      .catch((error) => {
        console.error(error);
      });
}
    componentDidMount() { }

    render(){

        return(
            <View style = {[ styles.container ]}>
                <Text style = { styles.text }>{ this.state.thought }</Text>
                <Button onPress={this.handleClick.bind(this)} title="Learn More" color="#841584" />
            </View>

        );
    }
  } */

import React, { Component } from "react";
import {
	View,
	StyleSheet,
	Platform,
	Text,
	Button,
	Dimensions
} from "react-native";
import {
	TabView,
	TabBar,
	SceneMap,
	TabViewPagerAndroid
} from "react-native-tab-view";
import GestureRecognizer, {
	swipeDirections
} from "react-native-swipe-gestures";

export default class App extends React.Component {
	constructor() {
		super();
		this.state = {
			thought: "Welcome!",
			index: 0,
			routes: [
				{ key: "first", title: "Thoughts" },
				{ key: "second", title: "Saved Thoughts" }
			]
		};
	}
	handleClick = thought => {
		console.log(12312421);
		fetch("http://192.168.1.237:3000/thoughts")
			.then(res => res.json())
			.then(res => {
				this.setState({
					thought: JSON.stringify(
						res[Math.round(Math.random() * (3 - 1))].name
					)
				});
			})
			.catch(error => {
				console.error(error);
			});
	};
	  onSwipeUp(gestureState) {
    this.setState({thought: 'red'});
  }
 
  onSwipeDown(gestureState) {
    this.setState({thought: 'hello'});
  }
 
  onSwipeLeft(gestureState) {
    this.setState({thought: 'not today'});
  }
 
  onSwipeRight(gestureState) {
    this.setState({thought: 'tuna'});
  }

	render() {
		  const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };
		const FirstRoute = () => (
			<GestureRecognizer
        onSwipeUp={(state) => this.onSwipeUp(state)}
        onSwipeDown={(state) => this.onSwipeDown(state)}
        onSwipeLeft={(state) => this.onSwipeLeft(state)}
        onSwipeRight={(state) => this.onSwipeRight(state)}
        config={config}
        style={{
          flex: 1,
          backgroundColor: this.state.backgroundColor
        }}
        >

			<View style={[styles.container]}>
				<Text style={styles.text}>{this.state.thought}</Text>
			</View>
		      </GestureRecognizer>);
		const SecondRoute = () => (
			<View style={[styles.container, { backgroundColor: "#673ab7" }]} />
		);

		return (
			<TabView
				//
				swipeEnabled={false}
				renderTabBar={props => (
					<TabBar {...props} style={{backgroundColor: 'purple'}} />
				)}
				navigationState={this.state}
				renderScene={SceneMap({
					first: FirstRoute,
					second: SecondRoute
				})}
				onIndexChange={index => this.setState({ index })}
				initialLayout={{
					width: Dimensions.get("window").width,
					height: Dimensions.get("window").height
				}}
			/>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 25,
		paddingTop: Platform.OS == "ios" ? 20 : 0,
		backgroundColor: "#6c5a94"
	},

	text: {
		color: "white",
		fontSize: 45
	}
});
