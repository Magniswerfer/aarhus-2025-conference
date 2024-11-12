export default function XBreaker() {
  return (
    <section class="bg-black h-64 md:h-80 lg:h-96 relative overflow-hidden">
      <div class="container mx-auto h-full flex items-center justify-center">
        {/* Left text group */}
        <div class="absolute lg:relative left-4 md:left-8 lg:left-auto flex flex-col text-right z-10">
          <div class="flex flex-col lg:flex-row items-end gap-1 md:gap-2 lg:gap-4 lg:mr-24">
            <span class="text-white text-2xl md:text-4xl lg:text-6xl font-bold">
              WHAT
            </span>
            <span class="text-white text-2xl md:text-4xl lg:text-6xl font-bold">
              DOES
            </span>
            <span class="text-white text-2xl md:text-4xl lg:text-6xl font-bold">
              YOUR
            </span>
          </div>
        </div>

        {/* Giant X */}
        <div className="relative flex items-center justify-center h-full">
          <span
            className="text-white leading-none absolute"
            style={{
              fontSize: "clamp(30rem, 60vw, 40rem)",
              transform: "translateY(-2%)",
            }}
          >
            X
          </span>
        </div>

        {/* Right text group */}
        <div class="absolute lg:relative right-4 md:right-8 lg:right-auto flex flex-col text-left z-10">
          <div class="flex flex-col lg:flex-row items-start gap-1 md:gap-2 lg:gap-4 lg:ml-24">
            <span class="text-white text-2xl md:text-4xl lg:text-6xl font-bold">
              STAND
            </span>
            <span class="text-white text-2xl md:text-4xl lg:text-6xl font-bold">
              FOR?
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
