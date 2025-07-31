import { BaseModel } from './base.model'

export interface UserModel extends BaseModel {
  name: string
  avatar_url: string
  is_verified: boolean
}
