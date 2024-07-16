import { IUser } from './user.model';

export const sampleWithRequiredData: IUser = {
  id: 13282,
  login: '5',
};

export const sampleWithPartialData: IUser = {
  id: 15895,
  login: 'J',
};

export const sampleWithFullData: IUser = {
  id: 14033,
  login: 'r1w@FkTrOn\\qfZRtIT\\wE-Gtv6\\6y\\GaCh',
};
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
