import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function ResultList(props) {
  function handleClick(repo) {
    props.onResultItemClick(repo)
  }

  if (props.preloader) {
    return <h3>Loading...</h3>
  } else {
    return (
      <div className='ResultList'>
        {props.userQuery !== props.defaultQuery
          ? <h2>Search results</h2>
          : <h2>Popular repositories</h2>
        }

        {props.totalCount === 0 && <h3>Nothing was found</h3>}

        {props.repos.map((repo, index) => {
          const prettyUrl = repo.url.slice(8)
          return (
            <Link to={`/card/${repo.id}`} key={index}>
              <div className='ResultItem' onClick={() => {handleClick(repo)}}>
                <h3>{repo.name}</h3>
                <p>{repo.stars} ★</p>
                <a href={repo.url}>{prettyUrl}</a>
              </div>
            </Link>
          )
        })}
      </div>
    )
  }
}

export default ResultList
