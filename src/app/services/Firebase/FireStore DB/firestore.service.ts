import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection  } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
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

  createRandomDoc(data: any, path: string){
    const collection = this.firestore.collection(path);
    return collection.doc().set(data);
    //this.firestore.collection('Usuarios')
  }

  updateDoc(data: any, path: string, id:string){
    const collection = this.firestore.collection(path);
    return collection.doc(id).update(data);
  }

  deleteDoc(path: string, id:string){
    const collection = this.firestore.collection(path);
    return collection.doc(id).delete();
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

  async checkDocumentExists(path: string, id: string){
    const documentRef = this.firestore.collection(path).doc(id);
    
    if ((await documentRef.ref.get()).exists){
      console.log("el documento existia");
      return true;
    } else {
      console.log("el documento no existia");
      return false;
    }
    /*
    return document.get().subscribe(res =>{
        let returned = false;
        if (res.exists){
          console.log("el documento existia");
          returned = true;
        } else {
          console.log("el documento no existia");
          returned = false;
        }

        return returned;
    })
    */
  }

  /*
  checkDocumentField(path: string, doc:string, field: string){
      const document = this.firestore.collection(path).doc(doc)

      document.get.then((res){

      });

      await _users.doc(id).get().then((doc){
        if(doc.exists){
          doc.data().forEach((key, value) { 
            if(key == 'field'){
              var valueOfField = value;
            }
          });
        }
     });

  }
  */

}
