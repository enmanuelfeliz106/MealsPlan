import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { stringify } from 'querystring';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(public alerta: AlertController, private router: Router) { 
    
  }

  registrarUsuario(email: string, contrasena: string) {

    firebase.auth().createUserWithEmailAndPassword(email, contrasena).then((exito) => {
    this.alertaExito('Te has registrado correctamente', 'Revisa tu correo para verificar tu email antes de iniciar sesión.' );
    exito.user.sendEmailVerification();

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
      } else {
        this.alertaError('No has verificado tu email. Ve a tu correo y si no encuentras nuestro mensaje revisa en la bandeja de spams');
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



}
