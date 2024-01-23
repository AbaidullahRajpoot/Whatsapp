import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  FlatList
} from 'react-native';
import { width, height, totalSize } from 'react-native-dimension';
import { useGetConversationsQuery, useSentNewMessageMutation } from '../store/api/authapi';
const ChatScreen = () => {

  const [text, setText] = useState('');
  const [senderId, setsenderId] = useState('658ee4bcae3b8e6e08e086f9');
  const [reciverId, setreciverId] = useState('658ee4bcae3b8e6e08e086fa');
  const [pageNo, setpageNo] = useState(1);
  const [pageSize, setpageSize] = useState(10);
  const [conversationData, setConversationData] = useState(null);
  const [sentNewMessage] = useSentNewMessageMutation();

  const { data, error, isLoading, refetch } = useGetConversationsQuery(
    {
      sid: senderId,
      rid: reciverId,
      page: pageNo,
      size: pageSize,
    },
  );

  //---------------------------Set Input Data into State-----------------

  const handleInputChange = inputText => {
    setText(inputText);
  };

  //------------------------End Set Input Data into State-----------------
  //-------------------Fetch Data From Api--------------------------------

  const sentMessage = async () => {
    const data = {
      senderId: senderId,
      receiverId: reciverId,
      message: text
    }
    const sentMessageResult = await sentNewMessage({ data });
    if (sentMessageResult) {
      setText('')
      refetch();
    }

  };

  //-------------------End Fetch Data From Api--------------------------------

  //------------------------------Render Items--------------------------------


  const renderItem = ({ item, index }) => {
    return (
      item.sender && item.sender._id == senderId ?
        <View style={styles.chatLeft}>
          <View style={styles.userChat}>
            <Text style={styles.userChatText}>{item.text}</Text>
          </View>
        </View>
        :
        <View style={styles.chatRight}>
          <View style={styles.MyChat}>
            <Text style={styles.MyChatText}>{item.text}</Text>
          </View>
        </View>

    )
  };

  //------------------------------End Render Items--------------------------------

  //------------------------------Call Whenever Page Rendered---------------------

  useEffect(() => {
    setConversationData(data)
  }, [data])


  //---------------------------End Call Whenever Page Rendered---------------------

  return (
    <View style={styles.container}>
      <StatusBar translucent={true} />
      <View style={styles.header}>
        <View style={styles.headerSec1}>
          <Image
            style={styles.headerSec1_arrowimg}
            source={require('../assets/arrow.png')}
          />
          <Image
            style={styles.headerSec1_Avtorimg}
            source={require('../assets/Avatar.png')}
          />
          <Text style={styles.headerNamefont}>Ahmad</Text>
        </View>
        <View style={styles.headerSec2}>
          <Image style={styles.icon1} source={require('../assets/Video.png')} />
          <Image style={styles.icon1} source={require('../assets/Phone.png')} />
          <Image style={styles.icon1} source={require('../assets/Menu.png')} />
        </View>
      </View>
      <View style={styles.main}>
        {conversationData ?
          <FlatList
            data={conversationData.messages}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
          :
          <ActivityIndicator />
        }
      </View>
      <View style={styles.message}>
        <View style={styles.inputSec}>
          <TextInput
            style={styles.input}
            placeholder="Type something..."
            onChangeText={handleInputChange}
            value={text}
          />
        </View>
        <View style={styles.sentMessage}>
          <TouchableOpacity onPress={() => sentMessage()}>
            <Image
              style={styles.sentIcon}
              source={require('../assets/sent.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: height(13),
    width: width(100),
    backgroundColor: '#016B5D',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerSec1: {
    height: height(13),
    width: width(60),
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: height(3),
    paddingLeft: width(3),
  },
  headerSec1_arrowimg: {
    height: height(3),
    width: width(6),
    resizeMode: 'contain',
  },
  headerSec1_Avtorimg: {
    height: height(5),
    width: height(5),
    resizeMode: 'contain',
    marginLeft: width(5),
  },
  headerNamefont: {
    fontSize: totalSize(2),
    color: '#fff',
    fontWeight: '600',
    marginLeft: width(5),
  },
  headerSec2: {
    height: height(13),
    width: width(40),
    paddingTop: height(3),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  icon1: {
    height: height(3),
    width: width(6),
    resizeMode: 'contain',
    marginLeft: width(3),
  },
  main: {
    flex: 1,
    width: width(100),
    backgroundColor: 'black',
    justifyContent: "center",
    alignItems: "center"
  },
  message: {
    height: height(10),
    width: width(100),
    backgroundColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  inputSec: {
    height: height(7),
    width: width(75),
    borderRadius: 18,
    backgroundColor: '#fff',
  },
  input: {
    height: height(7),
    width: width(75),
    color: '#000',
    paddingLeft: width(5),
  },
  sentMessage: {
    height: height(7),
    width: height(7),
    borderRadius: 100,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sentIcon: {
    height: height(4),
    width: height(4),
    resizeMode: 'contain',
  },
  chatLeft: {
    width: width(100),
    alignItems: 'flex-end',
    marginTop: height(2),
  },
  userChat: {
    width: width(70),
    backgroundColor: '#A0AD98',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  userChatText: {
    padding: 10,
    color: '#000',
  },
  chatRight: {
    width: width(100),
    alignItems: 'flex-start',
    marginTop: height(2),
  },
  MyChat: {
    width: width(70),
    backgroundColor: '#fff',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderTopRightRadius: 12,
  },
  MyChatText: {
    padding: 10,
    color: '#000',
  },
});
export default ChatScreen;
