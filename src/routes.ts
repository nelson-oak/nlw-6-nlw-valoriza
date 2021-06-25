import { Router } from 'express'
import { AuthenticateUserController } from './controllers/AuthenticateUserController'
import { CreateComplimentController } from './controllers/CreateComplimentController'
import { CreateTagController } from './controllers/CreateTagController'
import { CreateUserController } from './controllers/CreateUserController'
import { ListReceivedComplimentsByUserIdController } from './controllers/ListReceivedComplimentsByUserIdController'
import { ListSentComplimentsByUserIdController } from './controllers/ListSentComplimentsByUserIdController'
import { ListTagsController } from './controllers/ListTagsController'
import { ListUsersController } from './controllers/ListUsersController'
import { ensureAdmin } from './middlewares/ensureAdmin'
import { ensureAuthenticated } from './middlewares/ensureAuthenticated'

const createUserController = new CreateUserController()
const createTagController = new CreateTagController()
const authenticateUserController = new AuthenticateUserController()
const createComplimentController = new CreateComplimentController()
const listSentComplimentsByUserIdController = new ListSentComplimentsByUserIdController()
const listReceivedComplimentsByUserIdController = new ListReceivedComplimentsByUserIdController()
const listTagsController = new ListTagsController()
const listUsersController = new ListUsersController()

const router = Router()

router.post('/users', createUserController.handle)
router.post('/tags', ensureAuthenticated, ensureAdmin, createTagController.handle)
router.post('/login', authenticateUserController.handle)
router.post('/compliments', ensureAuthenticated, createComplimentController.handle)

router.get('/users/compliments/sent', ensureAuthenticated, listSentComplimentsByUserIdController.handle)
router.get('/users/compliments/received', ensureAuthenticated, listReceivedComplimentsByUserIdController.handle)
router.get('/tags', ensureAuthenticated, listTagsController.handle)
router.get('/users', ensureAuthenticated, listUsersController.handle)

export { router }