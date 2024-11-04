export default function ConferenceGoals() {
  return (
    <section class="py-20">
      <div class="px-10">
        <div class="max-w-7xl mx-auto">
          <div class="px-32">
            <div class="flex gap-20">
              <div class="w-1/2">
                <h2 class="text-4xl font-roboto-condensed font-normal text-aarhus-red mb-8">
                  Conference Goals
                </h2>
                <div class="font-roboto-condensed space-y-6">
                  <p>
                    The sixth decennial Aarhus conference aims to continue to set new agendas 
                    for critical action, theory, and practice in computing. With the title, 
                    Computing (X) Crisis, we invite contributions that present and discuss 
                    the different roles of computing in shaping, understanding, improving, 
                    causing and acting on the human condition in a world subsumed by 
                    multiple crises.
                  </p>
                  {/* Add remaining paragraphs */}
                </div>
              </div>
              <div class="w-1/2 flex justify-center">
                <img 
                  src="/images/stop-the-flow2.png" 
                  class="w-4/5 object-contain" 
                  alt="Conference illustration" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
