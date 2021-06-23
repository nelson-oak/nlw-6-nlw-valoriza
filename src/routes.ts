import { Router } from 'express'
import { CreateTagController } from './controllers/CreateTagController'
import { CreateUserController } from './controllers/CreateUserController'
import { ensureAdmin } from './middlewares/ensureAdmin'

const createUserController = new CreateUserController()
const createTagController = new CreateTagController()

const router = Router()

router.post('/users', createUserController.handle)
router.post('/tags', ensureAdmin, createTagController.handle)

export { router }