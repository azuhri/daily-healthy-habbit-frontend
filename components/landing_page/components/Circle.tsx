export default function Circle({css}:any) {
    return (
        <div className={`w-[200px] h-[200px] rounded-full p-4 z-[9] flex justify-center items-center absolute ${css}`}>
            <div className="w-[120px] h-[120px] bg-white rounded-full">
            </div>
        </div>
    )
}