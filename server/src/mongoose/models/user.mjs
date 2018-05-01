import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId
const userSchema = new Schema(
  {
    account: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    subscribe: { type: Boolean, default: false },
    profile: { type: String, default: '' },
    avatar: { type: String, default: '' },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    role: { type: Number, default: 10 },
    resetPassword: { type: Boolean, default: false },
    description: { type: String, default: '' },
    token: { type: String, default: '' },
    location: { type: String, default: '' },
    github: { type: String, default: '' },
    website: { type: String, default: '' },
    deleted: { type: Boolean, default: false }
  },
  {
    usePushEach: true
  }
)

userSchema.index({ account: 1 }, { unique: true, sparse: true })
userSchema.index({ access_token: 1 })
userSchema.pre('save', next => {
  var now = new Date()
  userSchema.update_at = now
  next()
})

export default mongoose.model('user', userSchema)
