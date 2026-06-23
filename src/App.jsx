import { useState } from 'react'
import Tesseract from 'tesseract.js'

import UploadBox from './components/UploadBox'
import OCRResult from './components/OCRResult'
import Loader from './components/Loader'
import AnimatedButton from './components/AnimatedButton'

export default function App() {

  const [image, setImage] = useState(null)
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)

  const [history, setHistory] = useState([])
  const [showAllHistory, setShowAllHistory] = useState(false)
  const [toast, setToast] = useState(null)

  const extractText = async () => {

    if (!image) return

    setLoading(true)

    const result = await Tesseract.recognize(
      image,
      'eng'
    )

    const extractedText = result.data.text

    setText(extractedText)

    setHistory(prev => [
      {
        text: extractedText,
        date: 'Just now',
      },
      ...prev
    ])

    setLoading(false)
    setToast({
  characters: extractedText.length,
  filename: image.name,
})

setTimeout(() => {
  setToast(null)
}, 4000)

setLoading(false)
  }

  const copyHistory = async (content) => {

  await navigator.clipboard.writeText(content)

  setToast({
    copied: true,
  })

  setTimeout(() => {
    setToast(null)
  }, 3000)
}

  return (

    <>

      {/* BACKGROUND */}

      <div
        className="
          fixed
          inset-0
          z-0
          pointer-events-none
          overflow-hidden
        "
      >

<video
    autoPlay
    muted
    loop
    playsInline
    className="
      absolute
      inset-0
      w-full
      h-full
      object-cover
    "
    style={{
      opacity: 40,
      filter: 'blur(px) saturate(1)',
      transform: 'scale(1.05)',
    }}
  >

    <source
      src="/background.mp4"
      type="video/mp4"
    />

  </video>


        <div
          className="
            absolute
            inset-0
            bg-[#f1efda]/50
          "
        />

      </div>

      {/* MAIN */}

      <div className="
        relative
        z-10
        min-h-screen
        px-4
        py-8
        md:px-8
      ">

        {/* HERO */}

        <div className="text-center mb-10">

          <h1 className="
            text-5xl
            md:text-6xl
            font-extrabold
            tracking-tight
          ">

            <span className="text-red-500">
              <i>Flash</i>
            </span>

            <span className="text-black">
              <i>Frame</i>
            </span>

            <span className="text-yellow-500">
              <i>OCR⚡</i>
            </span>

          </h1>

          <p className="
            mt-3
            text-lg
            font-medium
            text-black-700
          ">
            <b>Lightning-fast text extraction powered by OCR.</b>
          </p>

          <p className="
            mt-2
            text-black-1000
          ">
            <b>An App by Ken Richardson.</b>
          </p>

        </div>

        {/* LAYOUT */}

        <div className="
          max-w-7xl
          mx-auto
          grid
          grid-cols-1
          lg:grid-cols-[1fr_370px]
          gap-6
        ">

          {/* MAIN CARD */}

          <div className="
            bg-white/85
            backdrop-blur-md
            border
            border-gray-200
            rounded-xl
            shadow-sm
            p-6
            space-y-6
          ">

            {/* UPLOAD */}

            <div className="
              border-2
              border-dashed
              border-red-300
              rounded-xl
              p-10
            ">

            <UploadBox
              setImage={setImage}
              setToast={setToast}
            />
            </div>

            {/* BUTTON */}

            {image && (

              <div className="
                flex
                justify-center
                mt-6
              ">

                <AnimatedButton variant='primary'
                  onClick={extractText}
                  className="
                  text-bold
                  text-9xl
                  "
                >
                  ⚡ Extract Text
                </AnimatedButton>

              </div>

            )}

            {/* LOADER */}

            {loading && <div className="flex justify-center mb-8"><Loader /></div>}

{/* RESULT CARD */}

{text && !loading && (

  <div className="
    mt-6

    bg-white/85
    backdrop-blur-md

    border
    border-gray-200

    rounded-xl

    shadow-sm

    p-6
  ">

    <div className="
      flex
      justify-between
      items-center
      mb-4
    ">

      <h2 className="
        text-2xl
        font-bold
        text-gray-800
      ">
        Extracted Text
      </h2>

    </div>

    <OCRResult
      text={text}
      setToast={setToast}
    />

  </div>

)}

          </div>

          {/* SIDEBAR */}

          <aside className="
            bg-white/85
            backdrop-blur-md
            border
            border-gray-200
            rounded-xl
            shadow-sm
            p-5
            h-fit
          ">

            <div className="
              flex
              justify-between
              items-center
              mb-5
            ">

              <h2 className="
                text-2xl
                font-extrabold
                text-gray-800
              ">
                History
              </h2>

              <button
                onClick={() => setHistory([])}
                className="
                  text-red-500
                  hover:text-red-700
                  text-sm
                  font-semibold
                "
              >
                Clear
              </button>

            </div>

            <div className="space-y-4">

              {history.length === 0 && (

                <div className="
                  border
                  border-dashed
                  border-gray-300
                  rounded-md
                  p-8
                  text-center
                  text-gray-400
                ">
                  No scans yet
                </div>

              )}

              {(showAllHistory
                ? history
                : history.slice(0, 4)
                ).map((item, index) => (

                <div
                  key={index}
                  className="
                    border
                    border-gray-200
                    rounded-md
                    p-4
                    hover:border-red-300
                    transition
                  "
                >

                  <div className="
                    flex
                    justify-between
                    items-start
                    gap-3
                  ">

                    <div className="flex-1">

                      <p className="
                        font-semibold
                        text-gray-800
                        line-clamp-2
                      ">
                        {item.text || 'No text found'}
                      </p>

                      <p className="
                        text-sm
                        text-gray-400
                        mt-2
                      ">
                        {item.date}
                      </p>

                    </div>

                    <button
                      onClick={() => copyHistory(item.text)}
                      className="
                        border
                        border-gray-200
                        hover:border-red-300
                        hover:bg-red-50
                        px-3
                        py-2
                        rounded-md
                        text-sm
                      "
                    >
                      Copy
                    </button>

                  </div>

                </div>

              ))}

              {/* SHOW MORE */}

{history.length > 4 && (

  <button
    onClick={() =>
      setShowAllHistory(
        !showAllHistory
      )
    }

    className="
      w-full
      mt-3

      border
      border-gray-200

      hover:border-red-300
      hover:bg-red-50

      rounded-md

      py-3

      text-sm
      font-semibold
      text-gray-600

      transition
    "
  >

    {showAllHistory
      ? '↑ Show Less'
      : '↓ Show More'
    }

  </button>

)}

            </div>

          </aside>

        </div>

        {/* TOAST */}

{toast && (

  <div className="
    fixed
    bottom-4
    right-4
    z-50

    w-[92vw]
    max-w-sm

    bg-white/90
    backdrop-blur-xl

    border
    border-gray-200

    shadow-2xl

    rounded-xl

    px-5
    py-4

    animate-[fadeIn_0.3s_ease]
  ">

    <h3 className="
  font-extrabold
  text-gray-900
  mb-1
  text-base
">

  {toast.error
    ? 'It’s an unsupported filetype 😔'
    : toast.copied
      ? 'Copied to clipboard ⚡'
      : 'Extraction done at Light-Speed⚡!'
  }

</h3>

{/* ERROR */}

{toast.error && (

  <p className="
    text-gray-600
    text-sm
    leading-relaxed
  ">
    Extracted characters from nowhere😅
  </p>

)}

{/* COPIED */}

{toast.copied && (

  <p className="
    text-gray-600
    text-sm
    leading-relaxed
  ">
    The extracted text was copied successfully.
  </p>

)}

{/* SUCCESS */}

{!toast.error && !toast.copied && (

  <p className="
    text-gray-600
    text-sm
    leading-relaxed
  ">
    Extracted

    <span className="font-bold">
      {' '} {toast.characters} {' '}
    </span>

    characters from

    <span className="font-bold">
      {' '} {toast.filename}
    </span>
  </p>

)}

  </div>
)}

        {/* FOOTER */}

        <div className="
          text-center
          mt-10
          text-gray-500
          text-sm
        ">
          Built with ❤️ and OCR Technology.
        </div>

      </div>

    </>

  )
}