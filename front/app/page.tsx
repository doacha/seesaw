import Link from 'next/link'
import Card from './components/card'
import Input from './components/Input'
import Button from './components/Button'

const Entrance = () => {
  const onClick = () => {}
  const submitButton = <Button color="primary" label="test" size="xl" />
  return (
    <div className="h-screen w-screen">
      <Card title={'내 통계'} />
      <Input
        label="text"
        type="text"
        placeholder="tttest"
        interval="15"
        submitButton={submitButton}
      />
    </div>
  )
}

export default Entrance
