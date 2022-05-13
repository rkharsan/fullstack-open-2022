const Header = ({ title }) => <h2>{title}</h2>;

const Part = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
);

const Content = ({ parts }) => (
  <div>
    {parts.map(({ id, name, exercises }) => (
      <Part key={id} name={name} exercises={exercises} />
    ))}
  </div>
);

const Total = ({ parts }) => {
  const sum = parts.map((part) => part.exercises).reduce((a, b) => a + b, 0);

  return (
    <p>
      <strong>total of {sum} exercises</strong>
    </p>
  );
};

const Course = ({ course }) => (
  <div>
    <Header title={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
);

export default Course;
