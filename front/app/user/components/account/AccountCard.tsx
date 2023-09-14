const AccountCard = () => {
  return (
    <div className="collapse collapse-arrow bg-white">
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium">
        Click me to show/hide content
      </div>
      <div className="collapse-content">
        <p>hello</p>
      </div>
    </div>
  )
}

export default AccountCard
