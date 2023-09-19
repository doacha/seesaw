interface ButtonProps {
  color: 'primary' | 'primary-container' | 'secondary' | 'error'
  label: string
  onClick: () => void
  size?: 'xl' | 'lg' | 'sm' | 'xs'
  disabled?: boolean
}

interface buttonConfigType {
  [key: string]: string
}

const buttonConfig: buttonConfigType = {
  primary: 'bg-primary',
  'primary-container': 'primary-container',
  secondary: 'bg-secondary',
  error: 'bg-error',

  xl: 'text-xl',
  lg: 'text-lg',
  sm: 'text-sm',
  xs: 'text-xs',
}
const Button = ({ color, label, onClick, size, disabled }: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`btn btn-sm h-10 w-full border-transparent ${
        buttonConfig[color]
      } ${buttonConfig[size ?? 'xl']} text-background font-sans`}
    >
      <span>{label}</span>
    </button>
  )
}

export default Button
