import React, { useState } from "react";
import {
  SectionList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

const TextInputExample = () => {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState({
    todoList: [{ title: "Tasks", data: [] }],
  });

  const addTask = () => {
    if (text.trim()) {
      const newTask = { id: Date.now(), text, completed: false };
      setTodos({
        todoList: [
          {
            title: "Tasks",
            data: [...todos.todoList[0].data, newTask],
          },
        ],
      });
      setText("");
    } else {
      alert("Please add a task");
    }
  };

  const removeTask = (id) => {
    const updatedTasks = todos.todoList[0].data.filter(
      (task) => task.id !== id
    );
    setTodos({
      todoList: [
        {
          title: "Tasks",
          data: updatedTasks,
        },
      ],
    });
  };

  const completeTask = (id) => {
    const updatedTasks = todos.todoList[0].data.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );

    setTodos({
      todoList: [
        {
          title: "Tasks",
          data: updatedTasks,
        },
      ],
    });
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={setText}
          value={text}
          placeholder="Enter Task"
        />

        <TouchableOpacity onPress={addTask} style={styles.primaryBtn}>
          <Text style={styles.btnText}>Add</Text>
        </TouchableOpacity>

        <SectionList
          sections={todos.todoList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View
              style={[styles.taskItem, item.completed && styles.completedTask]}
            >
              <Text
                style={[
                  styles.taskText,
                  item.completed && styles.completedText,
                ]}
              >
                {item.text}
              </Text>
              <View style={styles.buttonGroup}>
                <TouchableOpacity
                  onPress={() => removeTask(item.id)}
                  style={styles.secondaryBtn}
                >
                  <Text style={styles.btnText}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => completeTask(item.id)}
                  style={styles.successBtn}
                >
                  <Text style={styles.btnText}>
                    {item.completed ? "Undo" : "Complete"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionHeader}>{title}</Text>
          )}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: "85%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: "#bbb",
    backgroundColor: "#f9f9f9",
  },
  container: {
    flex: 1,
    paddingTop: 20,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  primaryBtn: {
    backgroundColor: "#6A5ACD",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginVertical: 10,
  },
  secondaryBtn: {
    backgroundColor: "#FF6347",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    marginVertical: 5,
    width: 100,
    alignItems: "center",
  },
  successBtn: {
    backgroundColor: "#32CD32",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    marginVertical: 5,
    width: 100,
    alignItems: "center",
  },
  taskItem: {
    padding: 15,
    marginVertical: 5,
    textAlign: "center",
    marginHorizontal: 5,
    borderRadius: 8,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "95%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  completedTask: {
    backgroundColor: "#d3ffd3",
  },
  taskText: {
    maxWidth: "65%",
    fontSize: 16,
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#555",
  },
  buttonGroup: {
    // flexDirection: "row",
    alignItems: "center",
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 15,
    color: "#333",
  },
  btnText: {
    color: "white",
    fontWeight: "600",
  },
});

export default TextInputExample;
