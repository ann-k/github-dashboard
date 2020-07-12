import React, { useState } from 'react'

function Paginator(props) {
  const rows = []
  const {totalCount, perPage, currentPage, userQuery, defaultQuery} = props
  const maxNumberOfPages = 10
  const availablePages = Math.ceil(totalCount / perPage) < maxNumberOfPages ? Math.ceil(totalCount / perPage) : maxNumberOfPages

  for (let i = 1; i <= availablePages; i++) {
    const pageNumber = i
    if (pageNumber <= (currentPage + 2) && pageNumber >= (currentPage - 2)) {
      rows.push(
        <div key={pageNumber}
          className={pageNumber === currentPage ?  'pageNumber active' : 'pageNumber'}
          onClick={() => handleClick(pageNumber)}>
          <p>{pageNumber}</p>
        </div>
      )
    }
  }

  function handleClick(pageNumber) {
    props.onPaginatorClick(pageNumber)
  }

  if (userQuery !== defaultQuery && availablePages > 1 && props.preloader === false) {
    return (
      <div className='Paginator'>
        {rows}
      </div>
    )
  } else return null
}

export default Paginator
