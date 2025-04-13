import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, TextInput, Button, FlatList, View, Alert, TouchableOpacity } from 'react-native';

// Item component for each task
const TodoItem = ({ item, onDelete, onUpdate }) => {
  return (
    <View style={{ flexDirection: 'row', marginVertical: 5, alignItems: 'center' }}>
      <Text style={{ flex: 1 }}>{item.text}</Text>
      <TouchableOpacity onPress={() => onUpdate(item.id)}>
        <Text style={{ color: 'blue', marginRight: 10 }}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onDelete(item.id)}>
        <Text style={{ color: 'red' }}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const App = () => {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState('');
  const [editingId, setEditingId] = useState(null);

  // Create Todo
  const createTodo = () => {
    if (todoText.trim()) {
      setTodos([...todos, { id: Math.random().toString(), text: todoText }]);
      setTodoText('');
    } else {
      Alert.alert('Please enter a todo.');
    }
  };

  // Delete Todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Edit Todo
  const updateTodo = (id) => {
    const todo = todos.find(todo => todo.id === id);
    setTodoText(todo.text);
    setEditingId(id);
  };

  // Update todo on save
  const saveTodo = () => {
    if (editingId) {
      setTodos(todos.map(todo => 
        todo.id === editingId ? { ...todo, text: todoText } : todo
      ));
      setEditingId(null);
    } else {
      createTodo();
    }
    setTodoText('');
  };

  useEffect(() => {
    // Any data fetching logic would go here (if needed)
  }, []);

  return (
    <SafeAreaView style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>CRUD Todo App</Text>

      {/* Input and Button to Add/Update Todo */}
      <TextInput
        value={todoText}
        onChangeText={setTodoText}
        placeholder="Enter Todo"
        style={{
          height: 40, 
          borderColor: '#ccc', 
          borderWidth: 1, 
          marginBottom: 10, 
          paddingHorizontal: 10,
        }}
      />
      <Button title={editingId ? 'Update Todo' : 'Add Todo'} onPress={saveTodo} />

      {/* Todo List */}
      <FlatList
        data={todos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TodoItem item={item} onDelete={deleteTodo} onUpdate={updateTodo} />
        )}
      />
    </SafeAreaView>
  );
};

export default App;

