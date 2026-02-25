import { Link } from "react-router-dom"

interface ButtonProps {
  children: React.ReactNode
  to?: string
  onClick?: () => void
  variant?: "primary" | "secondary"
  type?: "button" | "submit" | "reset"
}

export default function Button({
  children,
  to,
  onClick,
  variant = "primary",
  type = "button",
}: ButtonProps) {
  const baseStyle = "px-6 py-2 rounded-2xl font-semibold transition-all duration-300"

  const variants = {
    primary: "bg-[#193b97] text-white hover:bg-blue-700 hover:shadow-lg hover:-translate-y-1",
    secondary: "bg-gray-600 text-white hover:bg-gray-700 hover:shadow-lg hover:-translate-y-1",
  }

  if (to) {
    return (
      <Link to={to} className={`${baseStyle} ${variants[variant]}`}>
        {children}
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]}`}
    >
      {children}
    </button>
  )
}