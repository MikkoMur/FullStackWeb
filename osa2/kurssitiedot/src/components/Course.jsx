const Header = ({course_name}) => {
  return (
    <h2>{course_name}</h2>
  )
}
  
const Part = ({part}) => {
  return (
    <p>{part.name} {part.exercises}</p>
  )
}
  
const Content = ({parts}) => {
  return (
    <div>
      {parts.map(part =>
        <Part key={part.id} part={part}/>)
      }      
    </div>
  )
}
  
const Total = ({parts}) => {
    
  const total = parts.reduce( (sum, part) => sum + part.exercises, 0)
  
  return (
    <p><b>Total number of exercises: {total}</b></p>
  )
}
  
const Course = ({course}) => {
  return (
    <>
      <Header course_name={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </>
  )
}

export default Course