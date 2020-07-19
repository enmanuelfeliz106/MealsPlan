import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AlertController, PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { stringify } from 'querystring';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(public alerta: AlertController, private router: Router, public popoverCtrl: PopoverController) { 

  }

  registrarUsuario(email: string, contrasena: string, nombre: string, apellidos: string, sexo: string, fechaNacimiento: string) {

    firebase.auth().createUserWithEmailAndPassword(email, contrasena).then((exito) => {
      let usuarioID = firebase.auth().currentUser.uid;
      let dataUsuario = {
        email: email,
        nombre: nombre,
        apellidos: apellidos,
        sexo: sexo,
        fechaNacimiento: fechaNacimiento
      };
      firebase.firestore().collection('usuarios').doc(usuarioID).set(dataUsuario).then(exito => {
        console.log('Se ha guardado el usuario');
      }).catch(error => {
        console.log('No se ha podido guardar el usuario', error);
      });

      exito.user.sendEmailVerification().then(exito =>{
        this.alertaExito('Te has registrado correctamente', 'Revisa tu correo para verificar tu email antes de iniciar sesión.');
      });

      this.popoverCtrl.dismiss().then( exito => {
      this.cerrarSesion(); // cerrar sesion para evitar problemas con el menu
    });

    }).catch((error) => {
       // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      if (errorCode === 'auth/weak-password') {
        this.alertaError('La contraseña es muy debil: debe contener al menos 8 caracteres, preferiblemente numeros y letras.');

      } else if (errorCode === 'auth/email-already-in-use') {
        this.alertaError('Ya existe una cuenta asociada a ese email.');

      } else if (errorCode === 'auth/invalid-email') {
        this.alertaError('El email proporcionado no existe o no es válido');

      } else if (errorCode === 'auth/operation-not-allowed') {
        this.alertaError('Problemas con la base de datos, contactenos.');

      } else {
        this.alertaError(errorMessage);
      }
      console.log(error);
    });

  }

  login(email: string, contrasena: string) {

    firebase.auth().signInWithEmailAndPassword(email, contrasena).then((exito) => {

      if (exito.user.emailVerified) {
        this.router.navigate(['/home']);
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      } else {
        this.alertaError('No has verificado tu email. Ve a tu correo y si no encuentras nuestro mensaje revisa en la bandeja de spams');
        this.cerrarSesion(); // para evitar problemas con el menu
      }


    }).catch((error) => {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        if (errorCode === 'auth/invalid-email') {
          this.alertaError('Email incorrecto');
  
        } else if (errorCode === 'auth/user-disabled') {
          this.alertaError('Este usuario ha sido deshabilitado.');
  
        } else if (errorCode === 'auth/user-not-found') {
          this.alertaError('Usuario no existente.');
  
        } else if (errorCode === 'auth/wrong-password') {
          this.alertaError('Contraseña incorrecta');
  
        } else {
          this.alertaError(errorMessage);
        }
        console.log(error);
    });
  }

  async alertaExito(msg1: string, msg2: string) {
    const alert = await this.alerta.create({
      header: 'Exito',
      subHeader: msg1,
      message: msg2,
      buttons: ['OK'],
      cssClass: 'alertaExito',
    });


    await alert.present();
    
  }

  async alertaError(mensaje: string) {
    
    const alert = await this.alerta.create({
          header: 'Error',
          subHeader: 'Algo salio mal',
          message: mensaje,
          buttons: ['OK'],
          cssClass: 'alertaError'
        });
    
    await alert.present();
  }

  recuperarContrasena(email: string) {

    firebase.auth().sendPasswordResetEmail(email).then( (exito) => {
          // Password reset email sent.
          this.alertaExito('Se le ha mandado un correo.', 'Verifique su bandeja de entrada y siga los pasos del mensaje.');
          this.popoverCtrl.dismiss();
        })
        .catch((error) => {
          // Error occurred. Inspect error.code.
          let errorCode = error.code;
          let errorMessage = error.message;
          if (errorCode === 'auth/invalid-email') {
            this.alertaError('Email incorrecto o invalido.');
    
          } else if (errorCode === 'auth/user-not-found') {
            this.alertaError('Usuario no existente.');
    
          } else {
            this.alertaError(errorMessage);
          }
          console.log(error);
        });
  }

  cerrarSesion() {
    firebase.auth().signOut().then(exito => {
      this.router.navigate(['/inicio']);
    });
  }

  async eliminarCuenta() {
    let usuarioID = firebase.auth().currentUser.uid;
    const alert = await this.alerta.create({
      header: 'Eliminar Cuenta',
      subHeader: '¿Seguro que desea eliminar su cuenta?',
      message: 'Si elimina su cuenta perderá todas sus comidas registradas, toda la información de la cuenta y dejará de existir su usuario.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          cssClass: 'danger',
          handler: () => {
              
              let idUsuario = firebase.auth().currentUser.uid;
              let ruta = firebase.firestore().collection('usuarios').doc(idUsuario).collection('comidasGuardadas').path;

              

              firebase.auth().currentUser.delete().then(exito => {
                this.deleteCollection(ruta, 150); // 150 comidas borradas en cada vuelta
                this.cuentaBorrada();
                this.router.navigate(['/inicio']);

              }).catch( error => {
                 // Error occurred. Inspect error.code.
                let errorCode = error.code;
                let errorMessage = error.message;
                if (errorCode === 'auth/requires-recent-login') {
                  this.alertaError('Su inicio de sesión debe ser reciente para poder completar esta operación. Por favor cierre e inicie sesión e intentelo de nuevo.');

                } else {
                  this.alertaError(errorMessage);
                }

              });

          }
        }]
    });
    await alert.present();
  }

  async cuentaBorrada() {
    const alert = await this.alerta.create({
      header: 'Cuenta Borrada',
      subHeader: 'Lamentamos que se vaya',
      message: 'Registrese nuevamente cuando quiera, le estaremos esperando.',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
        }]
    });
    await alert.present();
  }

  deleteCollection(collectionPath, batchSize) {
    let collectionRef = firebase.firestore().collection(collectionPath);
    let query = collectionRef.orderBy('__name__').limit(batchSize);
  
    return new Promise((resolve, reject) => {
      this.deleteQueryBatch(query, batchSize, resolve, reject);
    });
  }
  
  deleteQueryBatch(query, batchSize, resolve, reject) {
    query.get()
      .then((snapshot) => {
        // When there are no documents left, we are done
        if (snapshot.size === 0) {
          return 0;
        }
  
        // Delete documents in a batch
        let batch = firebase.firestore().batch();
        snapshot.docs.forEach((doc) => {
          batch.delete(doc.ref);
        });
  
        return batch.commit().then(() => {
          return snapshot.size;
        });
      }).then((numDeleted) => {
        if (numDeleted === 0) {
          resolve();
          return;
        }
  
        // Recurse on the next process tick, to avoid
        // exploding the stack.
        process.nextTick((exito) => {

          this.deleteQueryBatch(query, batchSize, resolve, reject);
        });
      })
      .catch(reject);
  }


}
