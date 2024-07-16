import { IAuthority, NewAuthority } from './authority.model';

export const sampleWithRequiredData: IAuthority = {
  name: 'd5b00157-1223-4a70-a011-ee03e34452b9',
};

export const sampleWithPartialData: IAuthority = {
  name: '49aaf82c-e2a4-45b6-a253-a6b1f8a54727',
};

export const sampleWithFullData: IAuthority = {
  name: '0d14b782-c2b3-4e1e-b9bb-b20b2ca482ab',
};

export const sampleWithNewData: NewAuthority = {
  name: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
