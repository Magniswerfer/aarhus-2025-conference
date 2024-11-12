export default function XBreaker() {
  return (
    <section className="bg-black h-[10rem] relative overflow-hidden">
      <div className="container mx-auto h-full flex items-center justify-center">
        {/* Left text group */}
        <div className="flex flex-col lg:flex-row items-end text-right mr-12 lg:mr-24">
          <div className="flex flex-col lg:flex-row items-end gap-2 lg:gap-4">
            <span className="text-white text-4xl lg:text-6xl">WHAT</span>
            <span className="text-white text-4xl lg:text-6xl">DOES</span>
            <span className="text-white text-4xl lg:text-6xl">YOUR</span>
          </div>
        </div>

        {/* Giant X */}
        <div className="relative flex items-center justify-center h-full">
          <span
            className="text-white leading-none absolute"
            style={{
              fontSize: "clamp(20rem, 60vw, 28.5rem)",
              fontFamily: "Roboto Condensed"
            }}
          >
            X
          </span>
        </div>

        {/* Right text group */}
        <div className="flex flex-col lg:flex-row items-start text-left ml-12 lg:ml-24 lg:right-24">
          <div className="flex flex-col lg:flex-row items-start gap-2 lg:gap-4">
            <span className="text-white text-4xl lg:text-6xl">STAND</span>
            <span className="text-white text-4xl lg:text-6xl">FOR?</span>
          </div>
        </div>
      </div>
    </section>
  );
}
