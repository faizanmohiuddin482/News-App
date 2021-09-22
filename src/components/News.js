import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import axios from "react-native-axios";
import { API_KEY } from "../config/env";
import Article from "./Article";

const url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${API_KEY}&pageSize=5&page=`;

const News = () => {
  const [articles, setArticles] = useState([]);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [offset, setOffset] = useState(1);
  const [isListEnd, setIsListEnd] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    console.log(offset);
    if (!loading && !isListEnd) {
      console.log("getData");
      setLoading(true);
      // Service to get the data from the server to render
      axios
        .get(
          `https://newsapi.org/v2/top-headlines?country=in&apiKey=${API_KEY}&pageSize=5&page=` +
            offset
        )
        .then((response) => {
          // Successful response from the API Call
          console.log(response.data.articles.length, "jsonnnnnnnnnnnn");
          if (response.data.articles.length > 0) {
            setDataSource([...dataSource, ...response.data.articles]);
            setOffset(offset + 1);
            setLoading(false);
          } else {
            setIsListEnd(true);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const renderFooter = () => {
    return (
      // Footer View with Loader
      <View style={styles.footer}>
        {loading ? (
          <ActivityIndicator color="black" style={{ margin: 15 }} />
        ) : null}
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={dataSource}
        renderItem={({ item }) => (
          <Article
            title={item.title}
            urlImgage={item.urlToImage}
            description={item.description}
            sourceName={item.source}
            time={item.publishedAt}
          />
        )}
        keyExtractor={(item) => item.url}
        ListFooterComponent={renderFooter}
        onEndReached={getData}
        onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
  );
};

export default News;

const styles = StyleSheet.create({});
