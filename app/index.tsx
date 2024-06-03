
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, Button, TextInput, View, Modal, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from "../App.style";
import * as React from 'react';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
  color: string;
}

interface TodoItemProps {
  item: Todo;
}

const DATA = [
  {
    id: '1',
    title: 'Meditation',
    completed: false,
    color: "#EBC58C"
  },
  {
    id: '2',
    title: 'Coding',
    completed: false,
    color: "#6DB6DD"
  },
  {
    id: '3',
    title: 'Journaling',
    completed: false,
    color: "#BC96E6"
  }
]

//const TodoItem:  React.FC<TodoItemProps> = (props) => (


// const TodoItem = (props) => (
//   <View>
//     <Text>{props.title}</Text>
//   </View>
// )

export default function Index() {
  const [ items, setItems ] = useState(DATA);
  const [ text, setText ] = useState("");
  const [ isModalVisible, setIsModalVisible ] = useState(false);

  const addNewTodo = () => {
    let newTodo = {
      id: (items.length + 1).toString(),
      title: text,
      completed: false,
      color: "#DF5E5E"
    }

    setItems([...items, newTodo]);
    setText("");
    setIsModalVisible(false);
  }

  const markItemCompleted = (item: Todo) => {
    const itemIndex = items.findIndex(currItem => currItem.id === item.id);

    if(itemIndex !== -1) {
      const updatedItems = [...items];
      updatedItems[itemIndex] = {...items[itemIndex], completed: true};
      setItems(updatedItems);
    }
  }

  const TodoItem = (props: TodoItemProps) => (
    <TouchableOpacity style={[styles.item, { backgroundColor: props.item.color }]} onPress={() => markItemCompleted(props.item)}>
      <Text style={props.item.completed ? styles.itemTextCompleted : styles.itemText}>{props.item.title}</Text>
    </TouchableOpacity>
  )

  const renderAddButton = () => {
    return (
    <TouchableOpacity onPress={() => setIsModalVisible(true)}>
        <View style={styles.icon}>
          <Ionicons name="add" size={24} color="#652E00" />
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Modal visible={isModalVisible} transparent={true} onRequestClose={() => setIsModalVisible(!isModalVisible)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput style={styles.input} onChangeText={setText} value={text} />
            <Button title='Add Todo' onPress={addNewTodo} />
          </View>
        </View>
      </Modal>
      <StatusBar style="auto" />
      <FlatList 
        style={styles.list}
        data={items}
        renderItem={({item}) => <TodoItem item={item} />}
        keyExtractor={item => item.id}
        ListFooterComponent={renderAddButton}
        />
    </SafeAreaView>
  );
}
