import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

export const logedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // لو مش Browser → يبقى نعدي عادي
  if (!isPlatformBrowser(platformId)) return true;

  const token = localStorage.getItem('userToken');

  // امنع المستخدم من دخول صفحات login/register/forgot فقط
  const blockedPages = ['/login', '/register', '/forgot'];

  if (token && blockedPages.includes(state.url)) {
    router.navigate(['/home']);
    return false;
  }

  return true; // أي صفحة تانية مسموح
};

