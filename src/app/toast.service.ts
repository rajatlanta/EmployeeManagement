import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }

  toasts: any[] = [];

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
    console.log('in taoaster show');
  }

  remove(toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
