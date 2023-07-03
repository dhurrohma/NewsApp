import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import Search from "../Component/Search";
import InterMedium from "../assets/fonts/Inter-Medium.ttf";
import InterBold from "../assets/fonts/Inter-Bold.ttf";
import { useFonts } from "expo-font";
import BackButton from "../Component/BackButton";
import ApiKey from "../Utils/ApiKey";

const Sources = ({ route }) => {
    const [sources, setSources] = useState({});
    const [filteredSources, setFilteredSources] = useState([]);
    const navigation = useNavigation();
    const { category } = route.params;
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    useFonts({
        InterMedium: InterMedium,
        InterBold: InterBold
    });

    useEffect(() => {
        fetchSources();
    }, []);

    const fetchSources = async () => {
        try {
          const response = await axios.get(
            `https://newsapi.org/v2/sources?apiKey=${ApiKey}&category=${category}`
          );
      
          const data = response.data;
          if (data.status === "ok" && data.sources) {
            const sourcesData = data.sources.map(source => ({
              id: source.id,
              name: source.name
            }));
            setSources(sourcesData);
            setFilteredSources(sourcesData);
            setPage(prevPage => prevPage + 1);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
      

    const handleSourcePress = (sourceId) => {
        console.log('Selected source:', sourceId);
        navigation.navigate('Articles', { category, sourceId });
    };

    const handleSearch = (searchText) => {
        const filtered = Object.values(sources).filter(source => source.toLowerCase().includes(searchText.toLowerCase()));
        setFilteredSources(filtered);
    };

    const renderSourceButton = ({ item }) => (
        <TouchableOpacity
            style={styles.sourceButton}
            onPress={() => handleSourcePress(item.id)}
        >
            <Text style={styles.sourceButtonText}>{item.name}</Text>
        </TouchableOpacity>
    );

    const handleEndReached = () => {
        if (!loading) {
            setLoading(true);
            fetchSources();
        }
    };

    const renderFooter = () => {
        return loading ? (
            <ActivityIndicator size="small" color="gray" />
        ) : null;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{category.toUpperCase()}</Text>
            <Search onSearch={handleSearch} />
            <Text style={styles.selectMessage}>Please select a news source below</Text>

            {filteredSources.length > 0 ? (
                <FlatList
                    data={filteredSources}
                    renderItem={renderSourceButton}
                    keyExtractor={(item) => item.id.toString()}
                    onEndReached={handleEndReached}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={renderFooter}
                />
            ) : (
                loading ? (
                    <ActivityIndicator size="large" color="gray" />
                ) : <Text>No news sources available</Text>

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
    selectMessage: {
        fontFamily: 'InterMedium',
        fontSize: 15,
        padding: 14
    },
    newsSource: {
        fontSize: 16,
        marginBottom: 8,
    },
    sourceButton: {
        width: 200,
        height: 50,
        flex: 1,
        padding: 16,
        marginBottom: 8,
        backgroundColor: 'lightblue',
        borderRadius: 8,
        alignItems: 'center',
    },
    sourceButtonText: {
        fontSize: 14,
        fontFamily: 'InterMedium',
    },
});

export default Sources;
