// Example function to delete a todo document from Firestore
module.exports = async function deleteTodo(todoId: string, firestore) {
    try {
        // Get a reference to the todo document
        const todoRef = firestore.collection('todos').doc(todoId);

        // Delete the todo document
        await todoRef.delete();

        console.log('Todo document deleted successfully');
    } catch (error) {
        console.error('Error deleting todo document:', error);
        throw error;
    }
};
