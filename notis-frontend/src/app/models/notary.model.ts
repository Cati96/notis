import {Address} from './address.model';
import {Timetable} from './timetable.model';

class Services {
}

export class Notary {
  id: number;
  name: string;
  authorizationNumber: string;
  phoneNumber: string;
  address: Address;
  timetable: Timetable;
  services: Services[];
}
