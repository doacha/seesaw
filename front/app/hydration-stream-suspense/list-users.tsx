'use client'

import { Member } from '../types'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

async function getmembers() {
  return (await fetch('https://jsonplaceholder.typicode.com/members').then(
    (res) => res.json(),
  )) as Member[]
}

export default function Listmembers() {
  const [count, setCount] = React.useState(0)
  const { data } = useQuery<Member[]>({
    queryKey: ['stream-hydrate-members'],
    queryFn: () => getmembers(),
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
          {data?.map((member) => (
            <div
              key={member.memberEmail}
              style={{ border: '1px solid #ccc', textAlign: 'center' }}
            >
              <img
                src={`https://robohash.org/${member.memberEmail}?set=set2&size=180x180`}
                alt={member.memberName}
                style={{ width: 180, height: 180 }}
              />
              <h3>{member.memberName}</h3>
            </div>
          ))}
        </div>
      }
    </>
  )
}
