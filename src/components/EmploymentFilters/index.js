import './index.css'

const EmploymentFilters = props => {
  const {employmentTypesList, onSelectingEmployee, checkedTypes} = props

  return (
    <div>
      <h3 className="employment-heading">Type of Employment</h3>
      <ul>
        {employmentTypesList.map(each => (
          <li key={each.employmentTypeId}>
            <div className="input-container">
              <input
                type="checkbox"
                name="employmentType"
                id={each.employmentTypeId}
                value={each.employmentTypeId}
                checked={checkedTypes.includes(each.employmentTypeId)}
                onChange={() => onSelectingEmployee(each.employmentTypeId)}
              />
              <label className="input-label" htmlFor={each.employmentTypeId}>
                {each.label}
              </label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default EmploymentFilters
