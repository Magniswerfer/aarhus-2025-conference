import { Head } from "$fresh/runtime.ts";
import Layout from "../layouts/layout.tsx";

export default function AuthorGuidelinesPage() {
  return (
    <>
      <Head>
        <title>Author Guidelines | Aarhus 2025</title>
        <meta name="description" content="Guidelines for authors submitting to the Aarhus 2025 Conference" />
      </Head>
      <Layout>
        {/* Hero Section */}
        <div class="bg-aarhus-red py-20">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 class="text-4xl md:text-6xl font-bold text-white mb-6">
              Author Guidelines
            </h1>
            <p class="text-xl text-white/90 max-w-3xl">
              All submissions are made through the Precision Conference System (PCS 2.0). 
              Submissions conflicting with one or more guidelines will be removed before or during the reviewing process.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div class="prose max-w-none">
            {/* Template Downloads */}
            <section class="mb-16">
              <h2 class="text-3xl font-bold text-aarhus-red mb-6">Template Download Links</h2>
              <div class="bg-gray-50 p-6 rounded-lg">
                <p class="mb-4">
                  Aarhus2025 uses the ACM master article template and workflow for all submissions except Critiques 
                  where this template is optional (see the CfC above). Submissions appear in a single-column format 
                  although final papers will be produced in double-column.
                </p>
                <h3 class="font-semibold mb-4">Overview of the TAPS workflow:</h3>
                <a href="https://authors.acm.org/proceedings/production-information/taps-production-workflow" 
                   class="text-aarhus-red hover:text-aarhus-red/80 block mb-4">
                  https://authors.acm.org/proceedings/production-information/taps-production-workflow
                </a>

                <div class="space-y-4">
                  <div>
                    <h3 class="font-semibold mb-2">Microsoft Word:</h3>
                    <a href="https://authors.acm.org/proceedings/production-information/preparing-your-article-with-microsoft-word" 
                       class="text-aarhus-red hover:text-aarhus-red/80 block">
                      https://authors.acm.org/proceedings/production-information/preparing-your-article-with-microsoft-word
                    </a>
                  </div>

                  <div>
                    <h3 class="font-semibold mb-2">Latex:</h3>
                    <a href="https://authors.acm.org/proceedings/production-information/preparing-your-article-with-latex" 
                       class="text-aarhus-red hover:text-aarhus-red/80 block">
                      https://authors.acm.org/proceedings/production-information/preparing-your-article-with-latex
                    </a>
                    <p class="text-sm mt-1">(use the template files in the linked zip file)</p>
                  </div>

                  <div>
                    <h3 class="font-semibold mb-2">Overleaf:</h3>
                    <a href="https://authors.acm.org/proceedings/production-information/overleaf" 
                       class="text-aarhus-red hover:text-aarhus-red/80 block">
                      https://authors.acm.org/proceedings/production-information/overleaf
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* Preparation Guidelines */}
            <section class="mb-16">
              <h2 class="text-3xl font-bold text-aarhus-red mb-6">Prepare your submission</h2>
              <div class="bg-gray-50 p-6 rounded-lg">
                <p class="mb-4">
                  To prepare your contribution for submission, use the single column format using the provided 
                  Word or LaTeX templates. The correct templates for submissions are: single column Word Submission 
                  Template and single column LaTeX (using the "manuscript,review,anonymous" style available in the template).
                </p>
                <p class="mb-4">
                  Submit only the PDF version of your manuscript to PCS. When generating the PDF file, please make 
                  sure that the fonts are embedded in the PDF file. This will ensure that reviewers can view the 
                  paper without problems. Reviewers will review your paper in the single column format.
                </p>
              </div>
            </section>

            {/* Anonymization */}
            <section class="mb-16">
              <h2 class="text-3xl font-bold text-aarhus-red mb-6">Anonymisation</h2>
              <div class="bg-gray-50 p-6 rounded-lg">
                <p class="mb-4">
                  Submissions that are subject to double-blind peer review must be properly anonymized. Author names 
                  and affiliations cannot be disclosed. Make sure that author identities are not accidentally disclosed 
                  in file meta-data or by supplementary material.
                </p>
                <p>
                  Aarhus2025 adheres to the CHI anonymization policy; please note that references to previous work by 
                  the authors should not be anonymized but referred to in third person. Sometimes this is tricky but 
                  in general, do your best to anonymize.
                </p>
              </div>
            </section>

            {/* Copyright */}
            <section class="mb-16">
              <h2 class="text-3xl font-bold text-aarhus-red mb-6">Copyright</h2>
              <div class="bg-gray-50 p-6 rounded-lg">
                <p class="mb-4">
                  Your submission must be original work. It cannot have been published elsewhere, nor can it be under 
                  concurrent review for publication by another conference or journal.
                </p>
                <p class="mb-4">
                  All references must be complete, accurate, accessible to the public, and conform to the Conference 
                  Proceedings Publication Format. Do not cite publications that are proprietary or confidential at the 
                  time of publication.
                </p>
                <p>
                  Final camera-ready versions of accepted submissions must be accompanied by a signed copyright form 
                  which will be provided to accepted authors.
                </p>
              </div>
            </section>

            {/* Accessibility */}
            <section class="mb-16">
              <h2 class="text-3xl font-bold text-aarhus-red mb-6">Accessibility</h2>
              <div class="bg-gray-50 p-6 rounded-lg">
                <p class="mb-4">
                  Final submissions must adhere to ACM's guidelines on accessible PDFs. We recommend working 
                  accessibility into your submission sooner rather than later, as accessibility can be an issue also 
                  for reviewers.
                </p>
                <p class="mb-4">
                  Visual and audio materials must also be made accessible. For instance, videos must have captions 
                  describing both the audio and the visuals.
                </p>
                <h3 class="font-semibold mb-2">Helpful Resources:</h3>
                <ul class="list-disc ml-6 space-y-2">
                  <li>
                    <a href="http://www.sigaccess.org/welcome-to-sigaccess/resources/accessible-pdf-author-guide/" 
                       class="text-aarhus-red hover:text-aarhus-red/80">
                      ACM's guidelines on accessible PDFs
                    </a>
                  </li>
                  <li>
                    <a href="https://www.w3.org/WAI/media/av/description/" 
                       class="text-aarhus-red hover:text-aarhus-red/80">
                      Guidance on how to create descriptions for different media
                    </a>
                  </li>
                  <li>
                    <a href="https://www.youtube.com/watch?v=F3A1VffiOH4" 
                       class="text-aarhus-red hover:text-aarhus-red/80">
                      Video example of how to describe visuals in a video
                    </a>
                  </li>
                </ul>
              </div>
            </section>

            {/* AI Tools */}
            <section>
              <h2 class="text-3xl font-bold text-aarhus-red mb-6">Use of Generative AI-tools</h2>
              <div class="bg-gray-50 p-6 rounded-lg">
                <p class="mb-4">
                  Aarhus2025 adheres to the SIGCHI Policy on Authorship. The use of generative AI tools and 
                  technologies to create content is permitted but must be fully disclosed in the work. Generative AI 
                  tools and technologies may not be listed as authors.
                </p>
              </div>
            </section>
          </div>
        </div>
      </Layout>
    </>
  );
}
