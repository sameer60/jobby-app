import './Skills.css';

const Skills = props => {
  const {skillsDetails} = props

  return (
    <li className="skill-items-container">
      <img alt={skillsDetails.name} src={skillsDetails.image_url} />
      <p>{skillsDetails.name}</p>
    </li>
  )
}

export default Skills