import { BaseService } from "../api";

export class BasePatientService extends BaseService {}

export const PatientService = new BasePatientService("/patient");
