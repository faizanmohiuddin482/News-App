import React from 'react'
import { Text, Card,Divider } from 'react-native-elements';
import { StyleSheet, View, TouchableHighlight } from 'react-native';
import moment from 'moment';


const Article = ({title,urlImgage,description,sourceName,time}) => {
    // console.log(title,'article')
    const timeAt = moment(time || moment.now()).fromNow();

    return (
       <TouchableHighlight>
          <Card    
           featuredTitle={title}
           featuredTitleStyle={{
               marginHorizontal: 5,
               textShadowColor: '#00000f',
               textShadowOffset: { width: 3, height: 3 },
               textShadowRadius: 3
           }}
           image={{
               uri:
               urlImgage
           }}
           >
              <Text style={{ marginBottom: 10 }}>
						{description || 'Read more...'}
					</Text>
                    <Divider style={{ backgroundColor: '#dfe6e9' }} />
                    <View
						style={{ flexDirection: 'row', justifyContent: 'space-between' }}
					>
						<Text
							style={{
								margin: 5,
								fontStyle: 'italic',
								color: '#b2bec3',
								fontSize: 10
							}}
						>
							{sourceName ? sourceName.name : null}
						</Text>
						<Text
							style={{
								margin: 5,
								fontStyle: 'italic',
								color: '#b2bec3',
								fontSize: 10
							}}
						>
							{timeAt}
						</Text>
					</View>
           </Card>
       </TouchableHighlight>
    )
}

export default Article

const styles = StyleSheet.create({})
