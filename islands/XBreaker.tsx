export default function XBreaker() {
  return (
    <section class="bg-black h-64 md:h-64 xl:h-64 relative overflow-hidden">
      <div class="container mx-auto h-full flex items-center justify-center">
        {/* Left text group */}
        <div class="absolute xl:relative left-8 sm:left-20 md:left-16 lg:left-60 xl:left-auto flex flex-col text-right z-10">
          <div class="flex flex-col xl:flex-row items-end gap-1 md:gap-2 xl:gap-4 xl:mr-24">
            <span class="text-white text-2xl md:text-4xl xl:text-6xl font-bold">
              WHAT
            </span>
            <span class="text-white text-2xl md:text-4xl xl:text-6xl font-bold">
              DOES
            </span>
            <span class="text-white text-2xl md:text-4xl xl:text-6xl font-bold">
              YOUR
            </span>
          </div>
        </div>
        {/* Giant X */}
        <div class="absolute xl:relative left-1/2 -translate-x-1/2 xl:left-auto xl:transform-none flex items-center justify-center h-full">
          <span
            class="text-white leading-none absolute"
            style={{
              fontSize: "clamp(30rem, 60vw, 40rem)",
              transform: "translateY(-2%)",
            }}
          >
            X
          </span>
        </div>
        {/* Right text group */}
        <div class="absolute xl:relative right-8 sm:right-20 md:right-16 lg:right-60 xl:right-auto flex flex-col text-left z-10">
          <div class="flex flex-col xl:flex-row items-start gap-1 md:gap-2 xl:gap-4 xl:ml-24">
            <span class="text-white text-2xl md:text-4xl xl:text-6xl font-bold">
              STAND
            </span>
            <span class="text-white text-2xl md:text-4xl xl:text-6xl font-bold">
              FOR?
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
