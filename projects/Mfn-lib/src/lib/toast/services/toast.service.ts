import { Injectable, ComponentRef, ApplicationRef, createComponent, EnvironmentInjector, Type } from '@angular/core';
import { ToastComponent } from '../components/toast.component';
import { ToastData } from '../interfaces/toast.interface';

@Injectable({
  providedIn: 'root'
})@Injectable({ providedIn: 'root' })
export class ToastService {
  private toasts = new Map<string, ComponentRef<ToastComponent>>();

  constructor(
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector
  ) {}

  show(config: ToastData): string {
    const id = this.generateId();
    const componentRef = this.createToast({ ...config, id });

    this.toasts.set(id, componentRef);

    return id;
  }

  success(message: string, title?: string, options: Partial<ToastData> = {}): string {
    return this.show({ ...options, message, title, type: 'success' });
  }

  error(message: string, title?: string, options: Partial<ToastData> = {}): string {
    return this.show({ ...options, message, title, type: 'error' });
  }

  warning(message: string, title?: string, options: Partial<ToastData> = {}): string {
    return this.show({ ...options, message, title, type: 'warning' });
  }

  info(message: string, title?: string, options: Partial<ToastData> = {}): string {
    return this.show({ ...options, message, title, type: 'info' });
  }

  private createToast(data: ToastData): ComponentRef<ToastComponent> {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const componentRef = createComponent(ToastComponent, {
      environmentInjector: this.injector,
      hostElement: container
    });

    componentRef.instance.data = data;

    this.appRef.attachView(componentRef.hostView);

    return componentRef;
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 9);
  }
}
