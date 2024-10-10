import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map, take } from 'rxjs/operators';

export const rankingGuard: CanActivateFn = (route, state) => {

  const auth = inject(AngularFireAuth);
  const router = inject(Router);

  return auth.authState.pipe(
    take(1),  
    map(user => {
      if (user) {
        const listParam = route.paramMap.get('list'); 
        if (listParam) {
          return true;
        } else {
          router.navigate(['/home']); 
          return false;
        }
      } else {
        router.navigate(['/login']);  
        return false;  
      }
    })
  );
};
