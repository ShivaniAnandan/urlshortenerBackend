import express from 'express';
import { shortenURL, redirectURL } from '../Controller/urlController.js';
const router = express.Router();

router.post('/shorten', shortenURL);
router.get('/:shortUrl', redirectURL);

export default router;
