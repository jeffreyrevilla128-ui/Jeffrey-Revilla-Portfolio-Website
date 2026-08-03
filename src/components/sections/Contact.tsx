function Contact() {
  return (
    <section
      id="contact"
      className="border-t border-white/10 bg-neutral-950 px-6 py-24 lg:px-8 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-end">

          {/* Main Content */}
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
              Contact
            </p>

            <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Have a problem that needs a solution?
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-8 text-neutral-400 sm:text-lg">
              Whether you need a web application, an existing workflow
              improved, or help turning an idea into a working system,
              I&apos;d be happy to discuss it with you.
            </p>

            {/* Email CTA */}
            <a
              href="mailto:your@email.com"
              className="mt-8 inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-all hover:bg-neutral-200"
            >
              Get in Touch
            </a>
          </div>

          {/* Contact Details */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <p className="text-sm font-medium uppercase tracking-[0.15em] text-neutral-500">
              Connect With Me
            </p>

            <div className="mt-6 space-y-6">

              {/* Email */}
              <div>
                <p className="text-sm text-neutral-500">
                  Email
                </p>

                <a
                  href="mailto:your@email.com"
                  className="mt-1 block text-base text-white transition-colors hover:text-neutral-400"
                >
                  your@email.com
                </a>
              </div>

              {/* GitHub */}
              <div>
                <p className="text-sm text-neutral-500">
                  GitHub
                </p>

                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 block text-base text-white transition-colors hover:text-neutral-400"
                >
                  GitHub Profile
                </a>
              </div>

              {/* LinkedIn */}
              <div>
                <p className="text-sm text-neutral-500">
                  LinkedIn
                </p>

                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 block text-base text-white transition-colors hover:text-neutral-400"
                >
                  LinkedIn Profile
                </a>
              </div>

            </div>
          </div>
        </div>

        {/* Closing Statement */}
        <div className="mt-20 border-t border-white/10 pt-8">
          <p className="text-sm text-neutral-500">
            I&apos;m always open to discussing new projects, opportunities,
            and ideas.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Contact