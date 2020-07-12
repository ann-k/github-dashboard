import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Card(props) {
  const storedActiveRepo = JSON.parse(sessionStorage.getItem('activeRepo'))
  const { name, stars, url, lastCommitDate, languages, ownerName, ownerPhoto, ownerUrl, description, contributors } = storedActiveRepo ? storedActiveRepo : props.repo

  function handleClick() {
    sessionStorage.removeItem('activeRepo')
  }

  return (
    <div className='Card'>
      <div>
        <Link to='/' id='iconBack' onClick={handleClick}>← Back</Link>
      </div>

      <div>
        <h2>{name}</h2>
      </div>

      <div>
        <p>{description}</p>
        <p>{stars} ★</p>
        <p></p>
      </div>

      <div>
        <h4>Owner</h4>
        <a href={ownerUrl}>
          <p><img src={ownerPhoto} className='Avatar'></img>{ownerName}</p>
        </a>
      </div>
    </div>
  )
}

export default Card
