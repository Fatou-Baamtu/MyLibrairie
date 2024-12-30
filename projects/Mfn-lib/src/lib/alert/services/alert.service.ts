import { Injectable, ComponentRef, ApplicationRef, createComponent, EnvironmentInjector } from '@angular/core';
import {AlertData} from '../interfaces/alert.interface';
import {AlertComponent} from '../components/alert.component';

@Injectable({ providedIn: 'root' })
export class AlertService {
  private alerts = new Map<string, ComponentRef<AlertComponent>>();

  constructor(
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector
  ) {}

  show(config: AlertData): string {
    const id = this.generateId();
    const componentRef = this.createAlert({ ...config, id });

    this.alerts.set(id, componentRef);

    return id;
  }

  success(message: string, title?: string, options: Partial<AlertData> = {}): string {
    return this.show({ ...options, message, title, type: 'success' });
  }

  error(message: string, title?: string, options: Partial<AlertData> = {}): string {
    return this.show({ ...options, message, title, type: 'error' });
  }

  warning(message: string, title?: string, options: Partial<AlertData> = {}): string {
    return this.show({ ...options, message, title, type: 'warning' });
  }

  info(message: string, title?: string, options: Partial<AlertData> = {}): string {
    return this.show({ ...options, message, title, type: 'info' });
  }

  dismiss(id: string): void {
    const componentRef = this.alerts.get(id);
    if (componentRef) {
      componentRef.destroy();
      this.alerts.delete(id);
    }
  }

  private createAlert(config: AlertData): ComponentRef<AlertComponent> {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const componentRef = createComponent(AlertComponent, {
      environmentInjector: this.injector,
      hostElement: container
    });

    componentRef.instance.config = config;
    componentRef.instance.closed.subscribe(() => this.dismiss(config.id!));

    this.appRef.attachView(componentRef.hostView);

    return componentRef;
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 9);
  }
}
