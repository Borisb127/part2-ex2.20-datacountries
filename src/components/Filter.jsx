import React from 'react'

const Filter = ({ value, onChange }) => { // Filter = (props)
  return (
    <div>
        Find Countries: <input value={value} onChange={onChange} />
    </div>
  )
}

export default Filter