import { useState } from 'react'

export default function UploadBox({
  setImage,
  setToast,
}) {

  const [dragging, setDragging] = useState(false)
  const supportedTypes = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/gif',
  'image/bmp',
  'image/tiff',
]

const handleChange = (e) => {

  const file = e.target.files[0]

  if (!file) return

  if (!supportedTypes.includes(file.type)) {

    setToast({
      error: true,
    })

    setTimeout(() => {
      setToast(null)
    }, 3500)

    return
  }

  setImage(file)
}

  const handleDrop = (e) => {

  e.preventDefault()

  setDragging(false)

  const file = e.dataTransfer.files[0]

  if (!file) return

  if (!supportedTypes.includes(file.type)) {

    setToast({
      error: true,
    })

    setTimeout(() => {
      setToast(null)
    }, 3500)

    return
  }

  setImage(file)
}

  return (

    <label
      onDragOver={(e) => {
        e.preventDefault()
        setDragging(true)
      }}

      onDragLeave={() => {
        setDragging(false)
      }}

      onDrop={handleDrop}

      className={`
        relative
        flex
        flex-col
        items-center
        justify-center
        text-center
        cursor-pointer
        overflow-hidden
        select-none

        transition-all
        duration-500

        rounded-xl

        border-2
        border-dashed

        p-10

        ${dragging
          ? `
            border-red-400
            bg-red-50/70
            scale-[1.01]
          `
          : `
            border-red-200
            bg-transparent
          `
        }
      `}
    >

      {/* DOMINO DASH EFFECT */}

      <div
        className={`
          absolute
          inset-0
          rounded-xl
          pointer-events-none

          transition-all
          duration-700

          ${dragging
            ? 'upload-domino'
            : ''
          }
        `}
      />

      {/* FILE INPUT */}

      <input
        type="file"
        accept="
          image/png,
          image/jpeg,
          image/jpg,
          image/gif,
          image/bmp,
          image/tiff
        "
        className="hidden"
        onChange={handleChange}
      />

      {/* ICON */}

      <div
        className={`
          text-7xl
          mb-4
          text-red-400

          transition-all
          duration-500

          ${dragging
            ? 'scale-110 rotate-3'
            : ''
          }
        `}
      >
        ☁️
      </div>

      {/* TITLE */}

      <h2
        className={`
          text-3xl
          font-black
          text-gray-800
          mb-3

          transition-all
          duration-500

          ${dragging
            ? 'scale-105 tracking-wide'
            : ''
          }
        `}
      >
        Drop an image here, or click to upload.
      </h2>

      {/* TEXT */}

      <p
        className={`
          text-gray-500
          mb-3
          max-w-md
          leading-relaxed

          transition-all
          duration-500

          ${dragging
            ? 'scale-[1.03]'
            : ''
          }
        `}
      >
        <b>Upload an Image</b>
      </p>

      {/* FORMATS */}

      <p
        className={`
          text-sm
          text-gray-400

          transition-all
          duration-500

          ${dragging
            ? 'opacity-100'
            : 'opacity-80'
          }
        `}
      >
        PNG, JPG, JPEG, GIF, BMP, TIFF
      </p>

    </label>
  )
}