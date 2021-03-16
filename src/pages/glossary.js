import React from 'react'
import { useSelector } from 'react-redux'
import {GlossaryList} from "../components/Glossary/GlossaryList/GlossaryList";
import {GlossaryAddForm} from "../components/Glossary/GlossaryAddForm/GlossaryAddForm";
import {GlossaryFilter} from "../components/Glossary/GlossaryFilter/GlossaryFilter";
import {glossaryToArray} from "../helpers/glossary";

const Glossary = () => {
  let {glossary, loading, search, filter} = useSelector(s => s.glossary)

  glossary = glossaryToArray(glossary)
  const filteredGlossary = () => {
    return glossary
      .filter(({progress}) => {
        if (filter === "completed") {
          return progress === 100
        } else if (filter === "progress") {
          return progress < 100
        }
        return true
      })
      .filter(({eng, rus}) => eng.toLowerCase().includes(search) || rus.toLowerCase().includes(search))
  }

  const List = () => {
    if (loading) {
      return <div>loading</div>
    } else if (glossary.length) {
      const filteredList = filteredGlossary()
      return filteredList.length ? <GlossaryList list={filteredList} /> : <div>No words found</div>
    }
  }

  return (
    <div className="container">
      <h2 className="mt-3">Glossary</h2>
      {glossary.length ? <GlossaryFilter /> : null}
      <List />
      <GlossaryAddForm />
    </div>
  )
}

export default Glossary