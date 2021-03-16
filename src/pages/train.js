import React from 'react'
import {TrainCard} from "../components/Train/TrainCard/TrainCard";

const Train = () => {
  const modes = ["translate", "reverse", "construct", "writing"]
  return (
    <div className="container">
      <h2 className="mt-3">Choose train mode</h2>

      <div className="row mt-4">
        {modes.map(mode => (
          <div key={mode} className="col-sm-6 mb-4">
            <TrainCard mode={mode} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Train