import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchGlossary } from '../store/glossary/actions'

const Glossary = () => {
  const dispatch = useDispatch()
  const num = useSelector((state) => state.glossary)
  console.log(num);
  useEffect(() => {
    dispatch(fetchGlossary())
  }, [])
  return (
    <div>Here will be glossary {num.glossary}</div>
  )
}

export default Glossary