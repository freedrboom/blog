import mongoose from 'mongoose'

const { Schema } = mongoose
const { ObjectId } = Schema

const tagSchema = new Schema(
  {
    user: { type: ObjectId, ref: 'user' },
    name: { type: String, required: true },
    description: { type: String, requred: true },
    deleted: { type: Boolean, default: false }
  },
  {
    usePushEach: true
  }
)

tagSchema.index({ name: 1 })
export default mongoose.model('tag', tagSchema)
