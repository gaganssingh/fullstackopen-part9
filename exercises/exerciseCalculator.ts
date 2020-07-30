console.log("Calculating exercise");

interface ExerciseValues {
   target: number;
   log: Array<number>;
}

interface ExerciseResult {
   periodLength: number;
   trainingDays: number;
   success: boolean;
   rating: number;
   ratingDescription: string;
   target: number;
   average: number;
}

const calculateExercises = (
   log: Array<number>,
   target: number
): ExerciseResult => {
   if (log.length < 1) throw new Error("Make sure you add a full log");
   if (target <= 0) throw new Error("Set a target greater than 0");

   // total no. of days logged
   const periodLength = log.length;

   // total no. of training days logged
   const trainingDays = log.filter((i) => i > 0).length;

   // Target met for how many days
   const daysTargetMet = log.filter((i) => i >= target).length;

   // true / false if target was met
   const success = trainingDays <= daysTargetMet ? true : false;

   let rating; //a rating between the numbers 1-3 that tells how well the hours are met.
   let ratingDescription; //a text value explaining the rating

   if (success) {
      rating = 3;
      ratingDescription = "You are a beast!";
   } else if (trainingDays === 0) {
      rating = 1;
      ratingDescription = "Got off your butt. Pathetic!";
   } else {
      rating = 2;
      ratingDescription =
         "Is that all the energy you can muster? Do better next time.";
   }

   const sum = log.reduce((prev, curr) => prev + curr);
   const average = sum / periodLength; //the calculated average time

   return {
      periodLength,
      trainingDays,
      success,
      rating,
      ratingDescription,
      target,
      average,
   };
};

const parseExerciseArguments = (args: Array<string>): ExerciseValues => {
   // if (args.length < 4) throw new Error("Not enough arguments");

   const [, , target, ...log] = args;
   if (!isNaN(Number(target)) && log.every((value) => !isNaN(Number(value)))) {
      return {
         target: Number(target),
         log: log.map((value) => Number(value)),
      };
   } else {
      throw new Error("Provided values were not numbers!");
   }
};

try {
   console.log(parseExerciseArguments(process.argv));
   const { target, log } = parseExerciseArguments(process.argv);
   console.log(calculateExercises(log, target));
} catch (error) {
   console.log(error.message);
}

export { calculateExercises };
