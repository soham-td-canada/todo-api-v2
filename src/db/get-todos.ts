
// Example function to retrieve data from Firestore
module.exports = async function getTodos(firestore) {
    try {
        const snapshot = await firestore.collection('todos').get();

        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Error retrieving data from Firestore:', error);
        throw error;
    }
};