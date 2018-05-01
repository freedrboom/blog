import mongoose from 'mongoose'

const { Schema } = mongoose
const { ObjectId } = Schema

const commentSchema = new Schema(
  {
    user: { type: ObjectId, ref: 'user' },
    article: { type: ObjectId, ref: 'article' },
    type: { type: String, default: 'article' },
    comment_like: { type: Number, default: 0 },
    comment_hate: { type: Number, default: 0 },
    content: { type: String, required: true },
    floor: { type: Number },
    created_at: { type: Date, default: Date.now },
    deleted: { type: Boolean, default: false }
  },
  {
    usePushEach: true
  }
)
commentSchema.index({ 'article.id': 1, created_at: 1 })

commentSchema.virtual('view').get(() => this.content)

export default mongoose.model('comment', commentSchema)
