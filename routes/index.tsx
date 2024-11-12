// routes/index.tsx
import Hero from "../components/Hero.tsx";
import Layout from "../layouts/layout.tsx";
import ContentSection from "../components/ContentSection.tsx";
import XBreaker from "../islands/XBreaker.tsx";
import ConferenceDates from "../components/ConferenceDates.tsx";
import History from "../islands/History.tsx";

export default function Home() {
  return (
    <Layout>
      <Hero />
      <History />
      <ContentSection
        title="Conference Goals"
        content={[
          "The sixth decennial Aarhus conference aims to continue to set new agendas for critical action, theory, and practice in computing. With the title, Computing (X) Crisis, we invite contributions that present and discuss the different roles of computing in shaping, understanding, improving, causing and acting on the human condition in a world subsumed by multiple crises.",
          "The 1975, 1985 and 1995 Aarhus conferences focussed on computing in working life in the context of democracy. While both the 2005 and 2015 conferences acknowledged that computing influences most parts of human life (civic life, the welfare state, health, learning, leisure, culture, intimacy, …), the 2015 conference explicitly called for critical perspectives and alternatives in alignment with utopian principles—that is, the hope that things might not only be different but also radically better.",
          "Today, ‘crisis’ characterises seemingly perilous moments linked to the climate, economic and social inequality, democracy, relations among societies and, more broadly, a flourishing life for all critters, human and otherwise. And at the same time computing seems omnipresent, providing glimmers of hope but at the same time acting as a source of the troubles.",
          ,
          "We call for contributions offering new agendas and perspectives for influencing and responding to ‘Computing (X) Crisis.’ These might centre on alternatives to current directions in computing, offer methodological or theoretical developments, or present new forms of critical or societal engagements and action. With the (X) we invite authors to speculate on potential replacements of the universal X – with, after, in, etc – and on what it means to combine the two words. Current trends in critical research on computing point to areas such as political activism, civic engagement, aesthetics and artistic practices as areas that could fruitfully inform a critical discourse in computing.",
        ]}
        imageSrc="/images/stop-the-flow2.png"
        imageAlt="Conference Goals Illustration"
      />
      <XBreaker />
    </Layout>
  );
}
