import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AnimatedLottieView from "lottie-react-native";
import { useFonts } from "expo-font";
import InterMedium from "../assets/fonts/Inter-Medium.ttf";
import InterBold from "../assets/fonts/Inter-Bold.ttf";
import ApiKey from "../Utils/ApiKey";

const Home = () => {
    const [categories, setCategories] = useState([]);
    const navigation = useNavigation();

    useFonts({
        InterMedium: InterMedium,
        InterBold: InterBold
    });

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get(
                `https://newsapi.org/v2/sources?apiKey=${ApiKey}`
            );

            const data = response.data;
            const uniqueCategories = [...new Set(data.sources.map((sources) => sources.category))];

            setCategories(uniqueCategories);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCategoryPress = (category) => {
        console.log('Selected category:', category);
        navigation.navigate('Sources', { category });
    }

    const renderCategoryItem = ({ item }) => (
        <View style={styles.categoryButtonContainer}>
          <TouchableOpacity
            style={styles.categoryButton}
            onPress={() => handleCategoryPress(item)}
          >
            <Text style={styles.categoryButtonText}>{item.toUpperCase()}</Text>
          </TouchableOpacity>
        </View>
      );

      return (
        <View style={styles.container}>
          <AnimatedLottieView
            source={require('../assets/home.json')}
            autoPlay
            loop
            style={styles.animation}
          />
          <Text style={styles.text}>Please select a news category below</Text>
          <View style={styles.categoryList}>
            <FlatList
              data={categories}
              renderItem={renderCategoryItem}
              keyExtractor={(item, index) => index.toString()}
              numColumns={2}
            />
          </View>
        </View>
      );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#eef4f7'
    },
    text: {
        fontSize: 15,
        fontFamily: 'InterMedium',
        marginBottom: 16,
    },
    animation: {
        width: 200,
        height: 200
    },
    categoryList: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    categoryButtonContainer: {
        flex: 1,
        width: '100%',
        padding: 10,
    },
    categoryButton: {
        width: 150,
        height: 50,
        flex: 1,
        backgroundColor: 'lightblue',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    categoryButtonText: {
        fontSize: 14,
        fontFamily: 'InterMedium'
    },
});

export default Home;