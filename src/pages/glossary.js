import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import {GlossaryList} from "../components/Glossary/GlossaryList/GlossaryList";
import {GlossaryAddForm} from "../components/Glossary/GlossaryAddForm/GlossaryAddForm";
import {GlossaryFilter} from "../components/Glossary/GlossaryFilter/GlossaryFilter";
import Pagination from 'react-bootstrap/Pagination';
import {glossaryToArray} from "../helpers/glossary";
import {appConfig} from "../appConfig";

const Glossary = () => {
  let pages = []
  let {glossary, loading, search, filter} = useSelector(s => s.glossary)
  glossary = glossaryToArray(glossary)

  const [page, setPage] = useState(1);
  const [list, setList] = useState(glossary);
  const [pageList, setPageList] = useState([]);

  useEffect(() => {
    filterGlossary()

  }, [glossary.length])

  useEffect(() => {
    filterPageList()

    const maxPage = Math.ceil(list.length / appConfig.wordsPerPage)
    if (maxPage < page) {
      setPage(maxPage)
    }
  }, [list.length])


  useEffect(() => {
    filterPageList()
  }, [page])

  useEffect(() => {
    setPage(1)
    filterGlossary()
  }, [search, filter])

  const filterGlossary = () => {
    const newList = [...glossary]
      .filter(({progress}) => {
        if (filter === "completed") {
          return progress === 100
        } else if (filter === "progress") {
          return progress < 100
        }
        return true
      })
      .filter(({eng, rus}) => eng.toLowerCase().includes(search) || rus.toLowerCase().includes(search))

    setList(newList)
  }

  const filterPageList = () => {
    const newList = [...list]
    const arr = newList.splice((page - 1) * appConfig.wordsPerPage, appConfig.wordsPerPage)
    setPageList(arr)
  }

  const List = () => {
    if (loading) {
      return <div>loading</div>
    } else if (pageList.length) {
      return <GlossaryList list={pageList} />
    } else {
      return <div>No words found</div>
    }
  }

  const setCurrentPage = (num) => {
    setPage(num)
  }

  const createPagination = () => {
    let size = appConfig.wordsPerPage
    let totalPages = Math.ceil(list.length / size)
    // console.log(list.length, totalPages)
    for (let i = 0; i < totalPages; i++) {
      pages.push(
        <Pagination.Item key={i+1} active={i+1 === page} onClick={setCurrentPage.bind(this, i+1)}>
          {i+1}
        </Pagination.Item>
      );
    }
  }

  //TODO refactoring
  createPagination()

  return (
    <div className="container">
      <h2 className="mt-3">Glossary</h2>
      {glossary.length ? <GlossaryFilter /> : null}
      <List />
      {pages.length > 1 && <Pagination>{pages}</Pagination>}
      <GlossaryAddForm />
    </div>
  )
}

export default Glossary