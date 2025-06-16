export const Background = () => {
    return (
        <>
            <div className="absolute inset-0 bg-[url('/placeholder.png')] bg-cover bg-center opacity-20" />
            <div className="absolute top-20 left-10 w-32 h-32 bg-amber-200/30 rounded-full blur-xl animate-pulse" />
            <div className="absolute bottom-32 right-16 w-24 h-24 bg-orange-200/40 rounded-full blur-lg animate-pulse delay-1000" />
            <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-stone-300/50 rounded-full blur-md animate-bounce delay-500" />
        </>
    )
}