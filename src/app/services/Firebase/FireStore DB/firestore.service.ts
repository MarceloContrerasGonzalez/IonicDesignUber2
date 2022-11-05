import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection  } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  //Crear un documento dentro de una coleccion (crear una columna)
  createDoc(data: any, path: string, id:string){
    const collection = this.firestore.collection(path);
    return collection.doc(id).set(data);
    //this.firestore.collection('Usuarios')
  }

  updateDoc(data: any, path: string, id:string){
    const collection = this.firestore.collection(path);
    return collection.doc(id).update(data);
  }

  //Rescatar el contenido de una coleccion
  getCollections<tipo>(path: string){
    const collection = this.firestore.collection<tipo>(path);
    //valueChanges te devuelve solo la data
    //snapshotChanges devuelve el objeto, se transformo para que devuelva la id y la data
    return collection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as tipo;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    /*this.firestore.collection(path).valueChanges().subscribe((res) => {
        console.log(res);
    });*/

  }

  getDocument<tipo>(path: string, id: string){
    const document = this.firestore.collection<tipo>(path).doc(id);
    return document.valueChanges();
  };

}
