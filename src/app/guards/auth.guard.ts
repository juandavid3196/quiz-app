// auth.guard.ts
import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AngularFireAuth);
  const router = inject(Router);

  return auth.authState.pipe(
    map(user => {
      if (user) {
        return true;  // Usuario autenticado
      } else {
        router.navigate(['/login']);  // Redirige al login si no está autenticado
        return false;  // Usuario no autenticado
      }
    })
  );
};
