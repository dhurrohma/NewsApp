import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import InterMedium from "../assets/fonts/Inter-Medium.ttf";
import { useFonts } from "expo-font";

const Footer = () => {
    const navigation = useNavigation();

    useFonts({
        InterMedium: InterMedium
    })


    return (
        <View style={styles.footerContainer}>
            <Text style={styles.footerText}>App by Dhur Rohma</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    footerContainer: {
        width: "100%",
        height: 30,
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: "#30809b"
    },
    footerText: {
        fontSize: 12,
        fontFamily: 'InterMedium',
        alignItems: "center",
        color: "white"
    },
});

export default Footer;
