import React, { useState } from 'react'

function SearchField(props) {
  function handleChange(e) {
    const value = e.target.value
    props.onInputChange(value)
  }

  const { storedQuery } = props

  return (
    <div className='SearchField'>
      <input onChange={handleChange}
             placeholder={'Start typing repository name'}
             value={storedQuery || ''} >
      </input>
    </div>
  )
}

export default SearchField
