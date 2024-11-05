export default function Hero() {
  return (
    <section class="bg-aarhus-red pt-8 sm:pt-10">
      <div class="px-4 sm:px-6 md:px-10">
        <div class="max-w-7xl mx-auto">
          <div class="pb-4 sm:pb-6 md:pb-8">
            <div class="flex flex-col">
              <div class="flex flex-col relative">
                <div class="w-fit relative">
                  <div class="absolute right-0 -top-3 font-roboto-condensed text-black text-xl sm:text-2xl font-bold whitespace-nowrap">
                    18-22 AUGUST
                  </div>
                  <h1 class="w-fit text-white font-roboto-condensed font-bold text-8xl sm:text-7xl md:text-8xl lg:text-hero leading-[0.75] mt-4 sm:mt-2 md:mt-2 lg:mt-0 mb-1 sm:-mb-4 md:-mb-5 lg:-mb-8">
                    AARHUS
                  </h1>
                  <h1 class="w-fit font-roboto-condensed font-bold text-8xl sm:text-7xl md:text-8xl lg:text-hero leading-[0.75] mt-0 -mb-3 sm:-mb-5 md:-mb-6 lg:-mb-7">
                    2025
                  </h1>
                  <div class="w-fit font-roboto-condensed text-white text-2xl sm:text-3xl md:text-4xl font-light sm:font-thin mt-2 mb-2">
                    CONFERENCE
                  </div>
                </div>
              </div>
              <div class="self-end -mb-6 sm:-mb-8 md:-mb-12">
                <img 
                  src="/images/X_animation_new_words1.gif" 
                  class="w-full max-w-[500px] md:max-w-[600px] lg:max-w-[700px]" 
                  alt="Animation" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
