export default function OCRResult({ text }) {

  const copyText = async () => {

    await navigator.clipboard.writeText(text)

    alert('Copied!')
  }

  return (

    <div>

      <div className="
        flex
        justify-end
        mb-4
      ">

        <button
          onClick={copyText}
          className="
            border
            border-red-200
            text-red-500
            hover:bg-red-50
            px-5
            py-2
            rounded-xl
            font-semibold
            transition
          "
        >
          📋 Copy Text
        </button>

      </div>

      <textarea
        value={text}
        readOnly
      />

    </div>

  )
}