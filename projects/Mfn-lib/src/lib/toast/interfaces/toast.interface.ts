import {Position} from '../../shared/interface/Position';
import { Type } from '../../shared/interface/Type';

export interface ToastData {
  id?: string;
  title?: string;
  message: string;
  duration?: number;
  type?: Type;
  backgroundColor?: string;
  textColor?: string;
  position?: Position;

}
