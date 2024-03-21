interface Todo {
    difficultyLevel: string;
    id: string;
    dateCompleted: {
        _seconds: number;
        _nanoseconds: number;
    };
    taskName: string;
    completed: boolean;
    dateAdded: {
        _seconds: number;
        _nanoseconds: number;
    };
}

module.exports = async function updateTodo(todoId, updatedTodo: Todo, firestore) {
    try {
        await firestore.collection('todos')
            .doc(todoId)
            .set(updatedTodo);
        console.log('document updated successfully');
    } catch (error) {
        console.error('Error updating data from Firestore:', error);
        throw error;
    }
}