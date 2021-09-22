import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from '@react-native-community/netinfo';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import axios from "react-native-axios";
import { API_KEY } from "../config/env";
import Article from "./Article";

const News = () => {
  const [articles, setArticles] = useState([]);
  const [date, setDate] = useState(moment().format("YYYY/MM/DD"));
  const [toDate, setToDate] = useState(moment().format("YYYY/MM/DD"));
  const [oflineData, setOflineData] = useState();
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [offset, setOffset] = useState(1);
  const [isListEnd, setIsListEnd] = useState(false);
  const [netInfo, setNetInfo] = useState(false);

  const url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${API_KEY}&pageSize=5&from=${date}&to=${toDate}&page=`;

  useEffect(() => {
    getData();
	getAsyncData()
  }, [date,dataSource]);

  NetInfo.fetch().then(state => {
	  if(state.isConnected){
	  setNetInfo(true);
	  }else{
		  setNetInfo(false);
	  }
	// console.log('Connection type', state.type);
	// console.log('Is connected?', state.isConnected);
  });
  

  const getData = () => {
    console.log(offset);
    if (!loading && !isListEnd) {
      console.log("getData");
      setLoading(true);
      // Service to get the data from the server to render
      axios
        .get(url + offset)
        .then((response) => {
          // Successful response from the API Call
          console.log(response.data.articles.length, "jsonnnnnnnnnnnn");
          if (response.data.articles.length > 0) {
            setDataSource([...dataSource, ...response.data.articles]);
			storeData([...dataSource, ...response.data.articles])
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

  const storeData = async (value) => {
	try {
	  const jsonValue = JSON.stringify(value)
	  await AsyncStorage.setItem('dataStore', jsonValue)
	} catch (e) {
	  // saving error
	}
  }

 
const getAsyncData = async () => {
	try {
	  const jsonValue = await AsyncStorage.getItem('dataStore')
	
	if (jsonValue !== null) {
		// We have data!!
		setOflineData(JSON.parse(jsonValue));
	  }
	
	} catch(e) {
	  // error reading value
	}
  }


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
		<View style={{flexDirection: 'row',justifyContent: 'space-between',padding:10}}>
	 <DatePicker
          style={styles.datePickerStyle}
          date={date} // Initial date from state
          mode="date" // The enum of date, datetime and time
          placeholder="select date"
          format="YYYY-MM-DD"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              //display: 'none',
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
          }}
          onDateChange={(date) => {
            setDate(date);
          }}
        /> 
		<DatePicker
		style={styles.datePickerStyle}
		date={date} // Initial date from state
		mode="date" // The enum of date, datetime and time
		placeholder="select date"
		format="YYYY-MM-DD"
		confirmBtnText="Confirm"
		cancelBtnText="Cancel"
		customStyles={{
		  dateIcon: {
			//display: 'none',
			position: 'absolute',
			left: 0,
			top: 4,
			marginLeft: 0,
		  },
		  dateInput: {
			marginLeft: 36,
		  },
		}}
		onDateChange={(date) => {
		  setToDate(date);
		}}
	  />
	  </View>
      <FlatList
        data={!netInfo && oflineData != null ? oflineData : dataSource}
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
