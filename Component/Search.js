import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

const Search = ({ onSearch }) => {
    const [searchText, setSearchText] = useState("");

    const handleSearch = () => {
        onSearch(searchText);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="search..."
                value={searchText}
                onChangeText={setSearchText}
            />
            <Button title="Search" onPress={handleSearch} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#ccc",
        marginRight: 8,
        padding: 8,
        borderRadius: 8,
        height: 50
    }
});

export default Search;