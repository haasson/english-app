import React, {useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchGlossary } from '../store/glossary/actions'
import {GlossaryList} from "../components/Glossary/GlossaryList/GlossaryList";
import {GlossaryAddForm} from "../components/Glossary/GlossaryAddForm/GlossaryAddForm";
import {GlossaryFilter} from "../components/Glossary/GlossaryFilter/GlossaryFilter";

const Glossary = () => {
  const dispatch = useDispatch()
  const {glossary, loading, search} = useSelector(s => s.glossary)

  useEffect(() => {
    dispatch(fetchGlossary())
  }, [dispatch])

  const filteredGlossary = () => {
    return glossary.filter(({eng, rus}) => eng.toLowerCase().includes(search) || rus.toLowerCase().includes(search))
  }


  return (
    <div className="container">
      {glossary.length ? <GlossaryFilter /> : null}
      {loading
          ? <div>loading</div>
          : glossary.length
              ? <GlossaryList list={filteredGlossary()} />
              : <div>Here will be glossary</div>}
      <GlossaryAddForm />
    </div>
  )
}

export default Glossary