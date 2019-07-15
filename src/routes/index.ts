import { Router, Response } from 'express';
const router = Router();

/* GET home page. */
router.get('/', function(_req, res: Response) {
  res.render('index', { title: 'Express Contact Example' });
});

export default router;
