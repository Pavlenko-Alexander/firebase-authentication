import React from 'react'

function User({name, username}) {
  return (
    <div>
        <div>Name: {name}</div>
        <div>Username: {username}</div>
    </div>
  )
}

export default User