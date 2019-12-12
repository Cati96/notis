import {Timetable} from './timetable.model';
import {Service} from './service.model';
import {Address} from './address.model';

export class Translator {
  id: number;
  name: string;
  authorizationNumber: string;
  phoneNumber: string;
  address: Address;
  timetable: Timetable;
  services: Service[];
  languages: string[];
}
