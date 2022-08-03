const Header = ({course}) => <h2>{course.name}</h2>

const Part = ({part}) => <p>{part.name} {part.exercises}</p>

const Content = ({parts}) => {
  return (
    <div>
      {parts.map((part) => <Part key={part.id} part={part} />)}
    </div>
  )
}

const Total = ({parts}) => <h3>Number of exercises {parts.reduce((a,b) => a + b.exercises, 0)}</h3>

const Course = ({course}) => {
    return (
        <div>
            <Header course={course} />
            <Content parts={course['parts']} />
            <Total parts={course['parts']} />
        </div>
    )
}

export default Course;