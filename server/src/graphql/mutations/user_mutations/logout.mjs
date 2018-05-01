import { UserType } from '../../types'

export default {
  type: UserType,
  description: 'logout',
  resolve: async (root, args, req) => {
    if (!root.user) throw Error('请先登录')

    req.session.destroy()
    root.user.access_token = ''

    return await root.user.save()
  }
}
