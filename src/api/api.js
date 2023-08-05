import { collection, addDoc, query, where, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

export const addNewNote = async (newNote) => {
    try {
    const docRef = await addDoc(collection(db, "notes"), newNote);
        return docRef.id;
    } catch (error) {
    console.log(error);
        return null;
    }
};

export const deleteNote = async (id) => {
    try {
        const doc_id = await fetchDocumentId(id);
        await deleteDoc(doc(db, 'notes', doc_id[0]));
        console.log("deleted");
        return true;
    } catch(error) {
        console.log(error);
        return false;
    }
}

export const updateNote = async (id, title, content) => {
    try {
        const doc_id = await fetchDocumentId(id);
        const documentRef = doc(db, 'notes', doc_id[0]);
        const updatedNote = { 
            title: title,
            content: content,
        };
        await updateDoc(documentRef, updatedNote);
        return true;
    } catch(error) {
        console.log(error);
        return false;
    }
    
}

export const fetchDocumentId = async (id) => {
    const q = query(collection(db, "notes"), where("id", "==", id));
    const querySnapshot = await getDocs(q);
    const doc_id = querySnapshot.docs.map((doc) => {
        return doc.id;
    })
    return doc_id;
}

export const fetchNotesByUid = async (uid) => {
    const q = query(collection(db, "notes"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q); 
    const notesArray = querySnapshot.docs.map((doc) => {
        return doc.data();
    })
    return notesArray;
}