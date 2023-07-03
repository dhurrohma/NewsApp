import React from "react";
import { StyleSheet, View } from "react-native";
import WebView from "react-native-webview";
import BackButton from "../Component/BackButton";

const ArticleDetail = ({route}) => {
    const {article} = route.params;
    console.log(article.url);

    return (
        <View style={styles.container}>
            <WebView 
                source={{ uri: article.url }} 
                javaScriptEnabled={true}
                domStorageEnabled={true}
                scalesPageToFit={true}
            />
            <BackButton />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default ArticleDetail;