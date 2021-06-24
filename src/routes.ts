import { Router } from 'express'
import { AuthenticateUserController } from './controllers/AuthenticateUserController'
import { CreateComplimentCOntroller } from './controllers/CreateComplimentController'
import { CreateTagController } from './controllers/CreateTagController'
import { CreateUserController } from './controllers/CreateUserController'
import { ensureAdmin } from './middlewares/ensureAdmin'

const createUserController = new CreateUserController()
const createTagController = new CreateTagController()
const authenticateUserController = new AuthenticateUserController()
const createComplimentController = new CreateComplimentCOntroller()

const router = Router()

router.post('/users', createUserController.handle)
router.post('/tags', ensureAdmin, createTagController.handle)
router.post('/login', authenticateUserController.handle)
router.post('/compliments', createComplimentController.handle)

export { router }