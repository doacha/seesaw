// import Counter from "./counter";
import Listmembers from './list-members'
import { Suspense } from 'react'

export default async function Page() {
  return (
    <main style={{ maxWidth: 1200, marginInline: 'auto', padding: 20 }}>
      {/* <Counter /> */}
      <Suspense
        fallback={
          <p style={{ textAlign: 'center' }}>loading... on initial request</p>
        }
      >
        <Listmembers />
      </Suspense>
    </main>
  )
}
