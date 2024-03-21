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

module.exports = async function addTodo(newTodo: Todo, firestore) {
    try {
        await firestore.collection('todos').add(newTodo);
        console.log('document added successfully');
    } catch (error) {
        console.error('Error adding document', error);
        throw Error;
    }
}