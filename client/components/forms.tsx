import React from 'react'

type formFieldTypes = {
    isNewBug? : boolean, 
    id? : number,
    title? : string,
    description? : string,
    location? : string,
    processToReplicate? : string,
    priorityStatus? : string,
    author? : string,
    isResolved? : boolean,
    resolvedBy? : string,
    url? : string,
}
const Forms = ({isNewBug, id, title, description, location, processToReplicate, priorityStatus,
    author, isResolved, resolvedBy, url}:formFieldTypes) => {

  return (
    <>
        <h1>{isNewBug ? "New Bug Report" : "Update Bug Report"}</h1>

        <form>
            <div>
                <label>
                    Author
                    <input type="text"  />
                </label>
                <label>
                    Title
                    <input type="text"  />
                </label>
            </div>
            <div>
                <label>
                    Location
                    <textarea />
                </label>
                <label>
                    Description
                    <textarea />
                </label>
                 <label>
                    How to replicate
                    <textarea />
                </label>
            </div>
            <div>
                <label>
                    Priority Status
                    <select name="prioroty" id="priorityStatus">
                        <option value="low">LOW</option>
                        <option value="normal">NORMAL</option>
                        <option value="high">HIGH</option>
                    </select>
                </label>
                <label>
                    Resolved
                    <select name="isResolved" id="isBugResolved">
                        <option value="false">Bug is not Resolved</option>
                        <option value="true">Bug is resolved</option>
                    </select>
                </label>
                <label>
                    Resolved By
                    <input type="text"  />
                </label>
            </div>
            <div>
                <label>
                    Upload Image
                    <input type="file"  />
                </label>
            </div>
        </form>
    </>
  )
}

export default Forms