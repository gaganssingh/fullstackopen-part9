import React from "react";
import ReactDOM from "react-dom";

interface HeaderProps {
   name: string;
}
// interface ContentProps {
//    name: string;
//    exerciseCount: number;
// }
interface TotalProps {
   total: number;
}

interface CoursePartBase {
   name: string;
   exerciseCount: number;
}

interface CoursePartOne extends CoursePartBase {
   name: "Fundamentals";
   description: string;
}

interface CoursePartTwo extends CoursePartBase {
   name: "Using props to pass data";
   groupProjectCount: number;
}

interface CoursePartThree extends CoursePartBase {
   name: "Deeper type usage";
   description: string;
   exerciseSubmissionLink: string;
}
interface CoursePartFour extends CoursePartBase {
   name: "Fullstack Open";
   description: string;
   courseLink: string;
}

type CoursePart =
   | CoursePartOne
   | CoursePartTwo
   | CoursePartThree
   | CoursePartFour;

const assertNever = (value: never): never => {
   throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
   );
};

const courseParts: CoursePart[] = [
   {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
   },
   {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
   },
   {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
   },
   {
      name: "Fullstack Open",
      exerciseCount: 5,
      courseLink: "https://fullstackopen.com/en/",
      description: "Amazing fill stack course",
   },
];

const Header: React.FC<HeaderProps> = (props) => {
   return <h1>{props.name}</h1>;
};

const Content: React.FC<{ courses: Array<CoursePart> }> = ({ courses }) => (
   <div>
      {courses.map((course) => {
         switch (course.name) {
            case "Fundamentals":
               return (
                  <p>
                     {" "}
                     Name: {course.name} - Exercises: {course.exerciseCount} -
                     Desc: {course.description}{" "}
                  </p>
               );
            case "Using props to pass data":
               return (
                  <p>
                     {" "}
                     Name: {course.name} - Exercises: {course.exerciseCount} -
                     Group: {course.groupProjectCount}{" "}
                  </p>
               );
            case "Deeper type usage":
               return (
                  <p>
                     Name: {course.name} - Exercises: {course.exerciseCount} -
                     Desc: {course.description} - Link:{" "}
                     {course.exerciseSubmissionLink}{" "}
                  </p>
               );
            case "Fullstack Open":
               return (
                  <p>
                     Name: {course.name} - Exercises: {course.exerciseCount} -
                     Link: {course.courseLink}
                  </p>
               );

            default:
               assertNever(course);
               return <p></p>;
         }
      })}
   </div>
);

const Total: React.FC<TotalProps> = ({ total }) => {
   return <p>Number of exercises: {total}</p>;
};

const App: React.FC = () => {
   return (
      <div>
         <Header name="Half Stack application development" />

         <Content courses={courseParts} />

         <Total
            total={courseParts.reduce(
               (carry, part) => carry + part.exerciseCount,
               0
            )}
         />
      </div>
   );
};

ReactDOM.render(<App />, document.getElementById("root"));
