export default function Hero() {
  return (
    <section class="bg-aarhus-red">
      <div class="px-10">
        <div class="max-w-7xl mx-auto">
          <div class="py-12">
            <div class="flex flex-col">
              <div class="w-[520px]"> {/* Adjusted width to match AARHUS text width */}
                <div class="text-right font-roboto-condensed text-black text-2xl font-bold">
                  18-22 AUGUST
                </div>
                <h1 class="text-white font-roboto-condensed font-bold text-hero leading-[0.8] mt-0 mb-0">
                  AARHUS
                </h1>
                <h1 class="font-roboto-condensed font-bold text-hero leading-[0.8] mt-0 mb-0">
                  2025
                </h1>
                <div class="font-roboto-condensed text-white text-4xl font-thin leading-tight">
                  CONFERENCE
                </div>
              </div>
              <div class="self-end -mb-12">
                <img 
                  src="/images/X_animation_new_words1.gif" 
                  class="w-[700px]" 
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
