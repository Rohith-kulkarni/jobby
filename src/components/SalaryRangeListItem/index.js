import './index.css'

const SalaryRangeListItem = props => {
  const {salaryRangesList, onSalarySelect} = props
  return (
    <ul>
      <h2>Salary range</h2>
      {salaryRangesList.map(each => (
        <li key={each.salaryRangeId}>
          <div key={each.salaryRangeId} className="salary-container">
            <input
              type="radio"
              name="salary"
              id={each.salaryRangeId}
              onChange={() => onSalarySelect(each.salaryRangeId)}
            />
            <label htmlFor={each.salaryRangeId}>{each.label}</label>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default SalaryRangeListItem
