import multer from 'multer'
import path from 'path'

const storageLocation = multer.diskStorage({
  destination(_req, _file, next) {
    next(null, 'frontend/public/images/')
  },
  filename(_req, file, next) {
    next(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  },
})

const checkFileType = (_req, file, next) => {
  const acceptedTypes = /jpeg|jpg|png/
  const isExtvalid = acceptedTypes.test(
    path.extname(file.originalname).toLowerCase()
  )
  const isMimeValid = acceptedTypes.test(file.mimetype)

  if (isExtvalid && isMimeValid) next(null, true)
  else next('Images only are accepted!')
}

export default multer({
  storage: storageLocation,
  fileFilter: (req, file, next) => checkFileType(req, file, next),
})
