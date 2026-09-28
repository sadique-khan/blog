import React from "react"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{
    label: string;
    name: string;
    error?: string;
}

export default function Input({

    label,
    name,
    id,
    type= "text",
    className= "",
    required= false,
    placeholder= "",
    error,
    defaultValue,
    ...props

}:InputProps){
    const inputId = id || name;
    return(
        <div className="flex flex-col gap-1.5 text-left">
                <label className="text-sm font-medium text-zinc-300" htmlFor={inputId}>{label}</label>
                <input 
                    id= {inputId}
                    name={name} 
                    type={type} 
                    key={defaultValue? String(defaultValue): undefined}
                    defaultValue={defaultValue}
                    className={`w-full rounded-lg border bg-zinc-900 px-3.5 py-2 text-sm text-white placeholder-zinc-500 outline-none transition focus:ring-2 ${
                    error
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                        : "border-zinc-800 focus:border-blue-500 focus:ring-blue-500/20"
                    } ${className}`}
                    required = {required}
                    placeholder= {placeholder}
                    {...props}
                />
                {error && <p className="text-xs text-red-400">{error}</p>}
        </div>
    )
}