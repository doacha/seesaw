'use client'
import { useState } from 'react'

interface TabProps {
  labels: string[]
  handleTabChange: (tab: string) => void
  activeTab: string
}

const Tab = ({ labels, activeTab, handleTabChange }: TabProps) => {
  return (
    <>
      <div className="tabs grid grid-cols-2 h-10 font-scDreamMedium bg-white">
        <button
          className={`py-2 ${
            activeTab === 'tab1'
              ? 'tab-active border-b-2 border-primary text-primary'
              : // ?'tab-active tab-bordered border-primary text-primary'
                'text-surface'
          }`}
          onClick={() => handleTabChange('tab1')}
        >
          {labels[0]}
        </button>
        <button
          className={`py-2 ${
            activeTab === 'tab2'
              ? 'tab-active border-b-2 border-primary text-primary'
              : 'text-surface'
          }`}
          onClick={() => handleTabChange('tab2')}
        >
          {labels[1]}
        </button>
      </div>
    </>
  )
}

export default Tab
