import { Router } from 'express'
import { getUserInfo, getLogin, postLogin, postSignUp , deleteLogOut} from '../controllers/auth.controllers'
import { authenticatedCookie } from '../middlewares/authenticatedCookie'

const router: Router = Router()

router.get('/api/user-info', authenticatedCookie , getUserInfo)
router.post('/api/sign-up', postSignUp)
router.get('/api/login', authenticatedCookie, getLogin)
router.post('/api/login', postLogin)
router.delete('/api/logout', deleteLogOut)

export default router
