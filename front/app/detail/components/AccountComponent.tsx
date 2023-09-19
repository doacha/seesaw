import React, { useState } from 'react'

interface AccountProps {
  account: string
  onUpdate: (newValue: string) => void
}

const AccountComponent: React.FC<AccountProps> = ({ account, onUpdate }) => {
  const [clickAcc, setClickAcc] = useState(false)
  const [newAccount, setNewAccount] = useState(account)

  const clickAccount = () => {
    setClickAcc(!clickAcc)
    console.log('거래처 클릭')
  }

  const handleUpdate = () => {
    onUpdate(newAccount)
  }

  return (
    <div className="w-full flex flex-row gap-1 py-4 border-b-2 border-outline-container">
      <div className="w-28">
        <p className="font-scDreamExBold text-base">거래처</p>
      </div>
      <div className="flex my-auto w-full justify-between">
        {clickAcc ? (
          <p className="font-scDreamLight text-base">{account}</p>
        ) : (
          <>
            <input
              className="w-full mr-5"
              type="text"
              value={newAccount}
              onChange={(e) => setNewAccount(e.target.value)}
            />
            <button onClick={handleUpdate}>저장</button>
          </>
        )}
      </div>
    </div>
  )
}

export default AccountComponent
