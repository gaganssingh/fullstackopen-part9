import React from "react";
import ReactDOM from "react-dom";

interface HeaderProps {
   name: string;
}
interface ContentProps {
   name: string;
   exerciseCount: number;
}
interface TotalProps {
   total: number;
}

const Header: React.FC<HeaderProps> = (props) => {
   return <h1>{props.name}</h1>;
};

const Content: React.FC<ContentProps> = ({ name, exerciseCount }) => {
   return (
      <p>
         {name} {exerciseCount}
      </p>
   );
};

const Total: React.FC<TotalProps> = ({ total }) => {
   return <p>Number of exercises: {total}</p>;
};

const App: React.FC = () => {
   const courseName = "Half Stack application development";
   const courseParts = [
      {
         name: "Fundamentals",
         exerciseCount: 10,
      },
      {
         name: "Using props to pass data",
         exerciseCount: 7,
      },
      {
         name: "Deeper type usage",
         exerciseCount: 14,
      },
   ];

   return (
      <div>
         <Header name={courseName} />
         {courseParts.map((course) => (
            <Content name={course.name} exerciseCount={course.exerciseCount} />
         ))}
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
