import React, { useState, useEffect } from 'react'
import SearchField from './SearchField.js'
import ResultList from './ResultList.js'
import Paginator from './Paginator.js'
const axios = require('axios')
var numeral = require('numeral')

function Home(props) {
  const [result, setResult] = useState({repos: []})
  const [preloader, setPreloader] = useState(false)
  const [totalCount, setTotalCount] = useState(0)
  const perPage = '10'

  const defaultQuery = 'stars:>100'
  const storedQuery = sessionStorage.getItem('query')
  const [userQuery, setUserQuery] = useState(storedQuery || defaultQuery)

  const storedCurrentPage = JSON.parse(sessionStorage.getItem('page'))
  const [currentPage, setCurrentPage] = useState(storedCurrentPage || 1)

  function handleSearch(value) {
    setPreloader(true)
    setUserQuery(value)
    setResult({repos: []})
    sessionStorage.setItem('query', value)
    setCurrentPage(1)
    sessionStorage.setItem('page', 1)
  }

  function handlePaginatorClick(pageNumber) {
    setCurrentPage(pageNumber)
    setResult({repos: []})
    sessionStorage.setItem('page', pageNumber)
  }

  useEffect(() => {
    setPreloader(true)
    const query = userQuery || defaultQuery
    console.log(query);
    const url = `https://api.github.com/search/repositories?q=${query}&sort=stars&order=desc&per_page=${perPage}&page=${currentPage}`
    // let token
    // const headers = { 'Authorization' : 'token ' + token }

    let cancel
    axios.get(url, {
      // headers: headers,
      cancelToken: new axios.CancelToken(c => cancel = c)
    })
    .then(response => {
      setTotalCount(response.data.total_count)
      const items = response.data.items
      const repos = []

      items.map((item, index) => {
        const repo = {
          id:             item.id,
          name:           item.name,
          url:            item.html_url,
          ownerName:      item.owner.login,
          ownerPhoto:     item.owner.avatar_url,
          ownerUrl:       item.owner.html_url,
          description:    item.description,
          stars:          numeral(item.stargazers_count).format('0 a'),
        }

        repos[index] = repo
      })

      setResult({repos: repos})
    })
    .catch(e => {
      if (axios.isCancel(e)) return
    })
    .then(() => setPreloader(false))
    return () => cancel()
  }, [userQuery, currentPage])

  return (
    <div className='Home'>
      <SearchField storedQuery={storedQuery}
                   onInputChange={handleSearch} />

      <ResultList repos={result.repos}
                  preloader={preloader}
                  totalCount={totalCount}
                  userQuery={userQuery}
                  defaultQuery={defaultQuery}
                  onResultItemClick={props.onResultItemClick} />

      <Paginator currentPage={currentPage}
                 preloader={preloader}
                 totalCount={totalCount}
                 perPage={perPage}
                 userQuery={userQuery}
                 defaultQuery={defaultQuery}
                 onPaginatorClick={handlePaginatorClick} />
    </div>
  )
}

export default Home
