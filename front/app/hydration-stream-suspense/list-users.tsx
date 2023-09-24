'use client'

import { User } from '../types'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

async function getUsers() {
  return (await fetch('https://jsonplaceholder.typicode.com/users').then(
    (res) => res.json(),
  )) as User[]
}

export default function ListUsers() {
  const [count, setCount] = React.useState(0)
  const { data } = useQuery<User[]>({
    queryKey: ['stream-hydrate-users'],
    queryFn: () => getUsers(),
    suspense: true,
    staleTime: 5 * 1000,
  })

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prev) => prev + 1)
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return (
    <>
      {/* <p>{count}</p> */}
      {
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 1fr',
            gap: 20,
          }}
        >
          {data?.map((user) => (
            <div
              key={user.userEmail}
              style={{ border: '1px solid #ccc', textAlign: 'center' }}
            >
              <img
                src={`https://robohash.org/${user.userEmail}?set=set2&size=180x180`}
                alt={user.userName}
                style={{ width: 180, height: 180 }}
              />
              <h3>{user.userName}</h3>
            </div>
          ))}
        </div>
      }
    </>
  )
}
