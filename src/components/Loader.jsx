export default function Loader() {

  return (

    <div className="
      flex
      flex-col
      items-center
      justify-center
      py-16
    ">

      {/* CORE */}

      <div className="
        relative
        w-72
        h-44

        overflow-hidden

        rounded-xl

        border
        border-red-200

        bg-black
      ">

        {/* NOISE */}

        <div className="
          absolute
          inset-0
          nanite-noise
        " />

        {/* GLITCH LINES */}

        <div className="
          absolute
          inset-0
          glitch-lines
        " />

        {/* SCAN BEAM */}

        <div className="
          absolute
          inset-0
          scan-beam
        " />

        {/* NANITE DOTS */}

        <div className="
          absolute
          inset-0
          nanite-dots
        " />

        {/* CENTER TEXT */}

        <div className="
          absolute
          inset-0

          flex
          flex-col
          items-center
          justify-center

          z-10
        ">

          <div className="
            text-red-400
            text-xs
            tracking-[0.4em]
            mb-3
            opacity-80
          ">
            OCR ANALYSIS
          </div>

          <div className="
            text-white
            text-2xl
            font-black
            tracking-tight
          ">
            SCANNING
          </div>

        </div>

      </div>

      {/* TEXT */}

      <div className="
        mt-6
        text-center
      ">

        <p className="
          text-gray-500
          tracking-wide
        ">
          Reconstructing text from pixels...
        </p>

      </div>

    </div>
  )
}