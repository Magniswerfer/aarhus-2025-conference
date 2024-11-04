
export default function XBreaker() {
  return (
    <section className="bg-black h-screen max-h-[20rem] relative flex items-center justify-center">
      <div className="container mx-auto flex items-center justify-center gap-4 lg:gap-8">
        {/* Left text group */}
        <div className="flex flex-col lg:flex-row items-end text-right">
          <div className="flex flex-col lg:flex-row items-end gap-2 lg:gap-4">
            <span className="text-white text-4xl lg:text-6xl ">WHAT</span>
            <span className="text-white text-4xl lg:text-6xl ">DOES</span>
            <span className="text-white text-4xl lg:text-6xl ">YOUR</span>
          </div>
        </div>

        {/* Giant X */}
        <div className="flex items-center justify-center h-full">
          <span className="text-white leading-none -mt-6" style={{ fontSize: 'min(28.5rem, 80vh)' }}>X</span>
        </div>

        {/* Right text group */}
        <div className="flex flex-col lg:flex-row items-start text-left">
          <div className="flex flex-col lg:flex-row items-start gap-2 lg:gap-4">
            <span className="text-white text-4xl lg:text-6xl ">STAND</span>
            <span className="text-white text-4xl lg:text-6xl ">FOR?</span>
          </div>
        </div>
      </div>
    </section>
  );
}

