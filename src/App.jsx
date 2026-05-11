import { useState } from 'react'
import Tesseract from 'tesseract.js'

import UploadBox from './components/UploadBox'
import OCRResult from './components/OCRResult'
import Loader from './components/Loader'

export default function App() {

  const [image, setImage] = useState(null)
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)

  const [history, setHistory] = useState([])

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
  }

  const copyHistory = async (content) => {

    await navigator.clipboard.writeText(content)

    alert('Copied!')
  }

  return (

    <div className="
      min-h-screen
      bg-[#f5f3ef]
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
          text-black-500
          text-lg
          font-medium
        ">
          Lightning-fast text extraction powered by OCR.
        </p>
        <p className="
          mt-3
          text-black-500
          text-lg
          font-medium
        ">
          An App by Ken Richardson.
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

        {/* MAIN */}

        <div className="
          bg-white
          border
          border-gray-200
          rounded-xl
          shadow-sm
          p-6
        ">

          {/* UPLOAD */}

          <div className="
            border-2
            border-dashed
            border-red-300
            rounded-xl
            p-10
          ">

            <UploadBox setImage={setImage} />

          </div>

          {/* BUTTON */}

          {image && (

            <div className="
              flex
              justify-center
              mt-6
            ">

              <button
                onClick={extractText}
                className="
                  bg-yellow-100
                  hover:bg-yellow-200
                  text-yellow-700
                  font-bold
                  px-8
                  py-4
                  rounded-xl
                  transition
                "
              >
                ⚡ Extract Text
              </button>

            </div>

          )}

          {/* LOADER */}

          {loading && <Loader />}

          {/* RESULT */}

          {text && !loading && (

            <div className="mt-10">

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

              <OCRResult text={text} />

            </div>

          )}

        </div>

        {/* SIDEBAR */}

        <aside className="
          bg-white
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
                rounded-xl
                p-8
                text-center
                text-gray-400
              ">
                No scans yet
              </div>

            )}

            {history.map((item, index) => (

              <div
                key={index}
                className="
                  border
                  border-gray-200
                  rounded-xl
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

          </div>

        </aside>

      </div>

      {/* FOOTER */}

      <div className="
        text-center
        mt-10
        text-gray-400
        text-sm
      ">
        Built with ❤️ and OCR Technology.
      </div>

    </div>

  )
}