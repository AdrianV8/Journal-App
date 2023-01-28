import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";

export const loadNotes = async( uid = '' ) => {
    if( !uid ) throw new Error('El UID del usuario no existe');

    // Hay que apuntar a la base de datos y a la colección que queremos rescatar.
    const collectionRef = collection( FirebaseDB, `${uid}/journal/notes` );
    const docs = await getDocs( collectionRef );

    const notes = [];

    /**
     * Sacar los datos (data()) dentro de los docs. Hay una función propia de firebase que saca los datos
     * Insertar nota con id y todos sus atributos correspondientes
     */
    docs.forEach(doc => {
        notes.push( { id: doc.id, ...doc.data() } )
    })

    // console.log(notes);

    return notes;
}