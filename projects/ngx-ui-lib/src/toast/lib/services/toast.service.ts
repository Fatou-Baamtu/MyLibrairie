import { Injectable, ComponentRef, ApplicationRef, createComponent, EnvironmentInjector, Type } from '@angular/core';
import { ToastComponent } from '../components/toast.component';
import { ToastData } from '../interfaces/toast.interface';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toasts: ComponentRef<ToastComponent>[] = [];

  constructor(
    private appRef: ApplicationRef,
    private environmentInjector: EnvironmentInjector
  ) {}

  show(data: ToastData) {
    // Créer une instance du composant avec la nouvelle API Angular
    const componentRef = createComponent(ToastComponent, {
      environmentInjector: this.environmentInjector
    });

    // Définir les données
    componentRef.instance.data = {
      id: Math.random().toString(36).substr(2, 9),
      duration: 3000,
      variant: 'default',
      ...data
    };

    // Attacher le composant à l'application
    this.appRef.attachView(componentRef.hostView);

    // Ajouter au DOM
    document.body.appendChild(componentRef.location.nativeElement);

    // Stocker la référence
    this.toasts.push(componentRef);

    // Nettoyer après la fermeture
    setTimeout(() => {
      const index = this.toasts.indexOf(componentRef);
      if (index > -1) {
        this.appRef.detachView(componentRef.hostView);
        componentRef.destroy();
        this.toasts.splice(index, 1);
      }
    }, data.duration || 3000);
  }

  success(message: string, title?: string, options: Partial<ToastData> = {}) {
    this.show({
      title,
      description: message,
      variant: 'success',
      backgroundColor: options.backgroundColor,
      textColor: options.textColor,
      ...options
    });
  }

  error(message: string, title?: string, options: Partial<ToastData> = {}) {
    this.show({
      title,
      description: message,
      variant: 'error',
      backgroundColor: options.backgroundColor,
      textColor: options.textColor,
      ...options
    });
  }

  warning(message: string, title?: string, options: Partial<ToastData> = {}) {
    this.show({
      title,
      description: message,
      variant: 'warning',
      backgroundColor: options.backgroundColor,
      textColor: options.textColor,
      ...options
    });
  }

  info(message: string, title?: string, options: Partial<ToastData> = {}) {
    this.show({
      title,
      description: message,
      variant: 'info',
      backgroundColor: options.backgroundColor,
      textColor: options.textColor,
      ...options
    });
  }
}
