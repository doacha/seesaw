'use client'

import { Suspense } from 'react'
import CreateRecordContainer from './components/CreateRecordContainer'
const CreatePage = ({ params }: { params: any }) => {
  return (
    <div className="bg-background-fill pt-16 min-h-[844px]">
      <Suspense fallback={<p>에헤라디야</p>}>
        <CreateRecordContainer recordId={params.recordId} />
      </Suspense>
    </div>
  )
}

export default CreatePage
