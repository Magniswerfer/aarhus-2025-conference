export default function Papers() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto flex gap-20">
          <div className="w-1/2">
            <h3 className="text-4xl font-roboto-condensed mb-8">Papers</h3>
            <div className="font-roboto-condensed space-y-6">
              <p>
                Papers are expected to be influential throughout the next decennium 
                by addressing fundamental issues and proposing new agendas or in other 
                ways offering research contributions with the potential for long-lasting impact.
              </p>
              <p>
                Papers should make a lasting and significant contribution to our knowledge 
                and understanding of improving computing for the human condition in a 
                world of multiple crises.
              </p>
              <p className="font-bold">
                In summary, submitted papers will be evaluated based on the extent the 
                submission:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>offers a strong contribution to theory and practice as regards Computing (X) Crisis</li>
                <li>has potential for long-lasting impact</li>
                <li>provides new perspectives</li>
              </ul>
            </div>
          </div>
          <div className="w-1/2 flex items-center justify-center">
            <img 
              src="/images/papersVinclusive.png" 
              alt="Papers" 
              className="w-4/5" 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
