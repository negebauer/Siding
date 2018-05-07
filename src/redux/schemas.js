import { schema } from 'normalizr'

export const courseSchema = new schema.Entity('courses', {
  folders: [folderSchema],
})

export const folderSchema = new schema.Entity('folders', {
  files: [fileSchema],
})

export const fileSchema = new schema.Entity('files', {})
