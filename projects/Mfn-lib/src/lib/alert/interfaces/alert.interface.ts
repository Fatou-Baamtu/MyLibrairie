import {Position} from '../../shared/interface/Position';
import { Type } from '../../shared/interface/Type';


export interface AlertData {
  id?: string;
  title?: string;
  message: string;
  type?: Type;
  position?: Position;
  dismissible?: boolean;
}
