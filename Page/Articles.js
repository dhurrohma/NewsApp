import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator, Image } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import Search from "../Component/Search";
import InterBold from "../assets/fonts/Inter-Bold.ttf";
import InterMedium from "../assets/fonts/Inter-Medium.ttf";
import MerriweatherSans from "../assets/fonts/MerriweatherSans-VariableFont_wght.ttf"
import { useFonts } from "expo-font";
import BackButton from "../Component/BackButton";
import ApiKey from "../Utils/ApiKey";

const Articles = ({ route }) => {
    const [articles, setArticles] = useState([]);
    const { sourceId } = route.params;
    const navigation = useNavigation();
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [sourceName, setSourceName] = useState("");

    useFonts({
        InterBold: InterBold,
        InterMedium: InterMedium,
        MerriweatherSans: MerriweatherSans
    });

    useEffect(() => {
        fetchArticles();
        getSourceName();
    }, []);

    const fetchArticles = async () => {
        try {
            const response = await axios.get(
                `https://newsapi.org/v2/top-headlines?apiKey=${ApiKey}&sources=${sourceId}`
            );

            const data = response.data;
            if (data.status === 'ok' && data.articles) {
                setArticles(prevArticles => [...prevArticles, ...data.articles]);
                setFilteredArticles(prevArticles => [...prevArticles, ...data.articles]);
                setPage(prevPage => prevPage + 1);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const getSourceName = async () => {
        try {
            const response = await axios.get(
                `https://newsapi.org/v2/sources?apiKey=${ApiKey}`
            );

            const data = response.data;
            if (data.status === 'ok' && data.sources) {
                const source = data.sources.find(source => source.id === sourceId);
                if (source) {
                    setSourceName(source.name);
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleReadButtonPress = (article) => {
        console.log('Selected article:', article);
        navigation.navigate('ArticleDetail', { article });
    };

    const handleSearch = (searchText) => {
        const filtered = articles.filter(article => article.title.toLowerCase().includes(searchText.toLowerCase()));
        setFilteredArticles(filtered);
    };

    const formatDate = (publishedAt) => {
        const dateObj = new Date(publishedAt);
        const year = dateObj.getFullYear();
        const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
        const date = ("0" + dateObj.getDate()).slice(-2);
        const hours = ("0" + dateObj.getHours()).slice(-2);
        const minutes = ("0" + dateObj.getMinutes()).slice(-2);

        return `${year}-${month}-${date} ${hours}:${minutes}`;
    };

    const renderArticleItem = ({ item }) => (
        <View style={styles.articleContainer}>
            <Text style={styles.articleTitle}>{item.title}</Text>
            <Text style={styles.author}>{item.author}</Text>
            <Text style={styles.publishedAt}>{formatDate(item.publishedAt)}</Text>
            <Image
                source={{ uri: item.urlToImage }}
                style={styles.articleImage}
                resizeMode="cover"
            />
            <TouchableOpacity
                style={styles.readButton}
                onPress={() => handleReadButtonPress(item)}
            >
                <Text style={styles.readButtonText}>Read</Text>
            </TouchableOpacity>
            <View style={styles.separator} />
        </View>
    );

    const handleEndReached = () => {
        if (!loading) {
            fetchArticles();
        }
    };

    const renderFooter = () => {
        return loading ? (
            <ActivityIndicator size="small" color="gray" />
        ) : null;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{sourceName}</Text>
            <Search onSearch={handleSearch} />
            {loading ? (
                <ActivityIndicator size="large" color="gray" />
            ) : filteredArticles.length > 0 ? (
                <FlatList
                    data={filteredArticles}
                    renderItem={renderArticleItem}
                    keyExtractor={(item, index) => item.url + index}
                    onEndReached={handleEndReached}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={renderFooter}
                />
            ) : (
                <Text>No articles available</Text>
            )}

            <BackButton />
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
    header: {
        fontSize: 18,
        fontFamily: 'InterBold',
        marginBottom: 16,
    },
    articleContainer: {
        marginBottom: 16,
    },
    articleTitle: {
        fontSize: 18,
        fontFamily: 'MerriweatherSans',
        marginBottom: 8,
    },
    articleImage: {
        width: "100%",
        height: 200,
        marginBottom: 8,
    },
    readButton: {
        backgroundColor: '#098cc2',
        padding: 8,
        borderRadius: 4,
        marginTop: 8,
        fontFamily: 'InterMedium'
    },
    readButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    separator: {
        height: 1,
        backgroundColor: 'gray',
        marginVertical: 10,
    },
    author: {
        fontFamily: 'InterMedium',
        fontSize: 10,
    },
    publishedAt: {
        fontFamily: 'InterMedium',
        fontSize: 10,
        marginBottom: 16,
    }
});

export default Articles;
