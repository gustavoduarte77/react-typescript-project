import type { UseFormRegisterReturn } from "react-hook-form"

interface InputProps {
  label?: string
  placeholder?: string
  type?: string
  register?: UseFormRegisterReturn
  value?: string | number
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Input({
  label,
  placeholder,
  type = "text",
  register,
  value,
  onChange,
}: InputProps) {
  return (
    <div className="flex flex-col gap-2 w-full max-w-md mx-auto">
      {label && <label className="text-white font-semibold text-lg">{label}</label>}

      <input
        type={type}
        placeholder={placeholder}
        {...(register ?? {})}
        value={value}
        onChange={onChange}
        className="px-4 py-2 rounded-2xl bg-[#2a2a2a] text-white font-medium outline-none border border-transparent focus:border-[#193b97] focus:ring-2 focus:ring-[#193b97] transition-all duration-300"
      />
    </div>
  )
}