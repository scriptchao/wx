/**
 * Created by scriptchao on 2017/12/26.
 */

import mongoose from 'mongoose'
import userSchema from '../schemas/user'

const User = mongoose.model('User',userSchema);

export default User