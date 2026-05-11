export default function UploadBox({ setImage }) {

  const handleChange = (e) => {

    const file = e.target.files[0]

    if (file) {
      setImage(file)
    }
  }

  return (

    <div className="
      flex
      flex-col
      items-center
      justify-center
      text-center
    ">

      <div className="text-7xl mb-4 text-red-400">
        ☁️
      </div>

      <h2 className="
        text-3xl
        font-black
        text-gray-800
        mb-2
      ">
        Upload an Image
      </h2>

      <p className="
        text-gray-400
        mb-6
      ">
        PNG, JPG, JPEG supported
      </p>

      <label>

        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleChange}
        />

        <div className="
          bg-red-500
          hover:bg-red-600
          text-white
          px-6
          py-4
          rounded-2xl
          font-bold
          cursor-pointer
          transition
        ">
          🏞️ Select Image
        </div>

      </label>

    </div>

  )
}