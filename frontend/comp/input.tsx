"use client";

export const Input = ({label, placeholder, onChange, type = "text"}: {
    label: string;
    placeholder: string;
    onChange: (e: any) => void;
    type?: "text" | "password"
}) => {
    return <div className="mt-3 gap-2">
        <div className="text-sm pb-1 pt-2 text-[rgba(240,240,228,0.5)]  font-medium ">
            <label>{label}</label>
        </div>
        <input className=" mt-1 relative focus:outline-0 inline-flex items-center justify-center gap-2 w-full h-12 px-5 font-semibold text-base select-none rounded-2xl transition duration-200 text-white border-2 border-white/10  bg-[linear-gradient(104deg,rgba(253,253,253,0.05)_5%,rgba(240,240,228,0.15)_100%)]  cursor-pointer " type={type} placeholder={placeholder} onChange={onChange} />
    </div>
}