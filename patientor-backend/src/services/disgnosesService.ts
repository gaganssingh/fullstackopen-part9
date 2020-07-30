import diagnosesData from "../data/diagnoses";
import { Diagnosis } from "../types";

const diagnoses: Diagnosis[] = diagnosesData;

const getEntries = (): Array<Diagnosis> => {
   return diagnoses;
};

const addEntry = () => {
   return null;
};

export default {
   getEntries,
   addEntry,
};
