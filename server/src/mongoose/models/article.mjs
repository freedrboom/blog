import mongoose from 'mongoose'

const { Schema } = mongoose
const { ObjectId } = Schema

const articleSchema = new Schema(
  {
    user: { type: ObjectId, ref: 'user' },
    tags: [{ type: ObjectId, ref: 'tag' }],
    comments: [{ type: ObjectId, ref: 'comment' }],
    title: { type: String, required: true },
    like: { type: Number, default: 0 },
    hate: { type: Number, default: 0 },
    viewed: { type: Number, default: 0 },
    content: { type: String, default: '' },
    release: { type: Boolean, default: false },
    cover: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted: { type: Boolean, default: false }
  },
  {
    usePushEach: true
  }
)

articleSchema.pre('save', next => {
  articleSchema.updated_at = Date.now
  next()
})
articleSchema.index({ 'author.name': 1 })
articleSchema.virtual('view').get(() => this.content)

export default mongoose.model('article', articleSchema)
