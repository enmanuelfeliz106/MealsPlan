import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(public alerta: AlertController, private router: Router) { }

  registrarUsuario(email: string, contrasena: string) {

    firebase.auth().createUserWithEmailAndPassword(email, contrasena).then((exito) => {
    this.alertaExito('Te has registrado correctamente', 'Ahora puedes iniciar sesión.' );

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

      this.router.navigate(['/inicio']);

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
      cssClass: 'alertaExito'
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
    let actionCodeSettings = {
      url: 'https://meals-plan.firebaseio.com',
      iOS: {
        bundleId: 'com.mealsPlan.app'
      },
      android: {
        packageName: 'com.mealsPlan.app',
        installApp: true,
        minimumVersion: '12'
      },
      handleCodeInApp: true
    };

    firebase.auth().sendPasswordResetEmail(email, actionCodeSettings).then( (exito) => {
          // Password reset email sent.
          this.alertaExito('Se le ha mandado un correo.', 'Verifique su bandeja de entrada y siga los pasos de correo.');
        })
        .catch((error) => {
          // Error occurred. Inspect error.code.
          let errorCode = error.code;
          let errorMessage = error.message;
          if (errorCode === 'auth/invalid-email') {
            this.alertaError('Email incorrecto o no invalido.');
    
          } else if (errorCode === 'auth/user-not-found') {
            this.alertaError('Usuario no existente.');
    
          } else {
            this.alertaError(errorMessage);
          }
          console.log(error);
        });
  }



}
