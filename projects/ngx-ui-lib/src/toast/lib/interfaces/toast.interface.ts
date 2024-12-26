export interface ToastData {
  id?: string;
  title?: string;
  description: string;
  duration?: number;
  variant?: 'success' | 'error' | 'warning' | 'info' | 'default';
  backgroundColor?: string;
  textColor?: string;
}
