import { Router, Response, Request } from 'express';

import {
  getContacts,
  getContact,
  addContact,
  editContact,
  deleteContact,
  blockContact
} from '../controllers/index';
const router = Router();

/* GET contacts listing. */
router.get('/', (_req: Request, res: Response) => {
  const contacts = getContacts();
  res.status(200).json({ success: 'true', message: 'All contacts', data: contacts });
});

/* GET single contact. */

router.get('/:id', (req: Request, res: Response) => {
  const contact = getContact(req.params.id);

  if (!contact)
    return res.status(404).json({ success: 'false', message: 'Error, Contact not available' });

  return res.status(200).json({ success: 'true', data: contact });
});

/* POST a contact. */

router.post('/', (req: Request, res: Response) => {
  const { value, errorMessages } = addContact(req.body);

  if (errorMessages) {
    return res.status(406).json({
      success: 'false',
      message: 'Error please input right contact details',
      error: errorMessages
    });
  }

  return res
    .status(201)
    .json({ success: 'true', message: 'Contact added successfully', data: value });
});

router.put('/:id', (req: Request, res: Response) => {
  const { params, body } = req;
  const { value, errorMessages, contact } = editContact({ params, body });

  if (contact === 'Not Found')
    return res.status(404).json({ success: 'false', message: 'Error, Contact not available' });

  if (errorMessages) {
    return res.status(406).json({
      success: 'false',
      message: 'Error please input right contact details',
      error: errorMessages
    });
  }

  return res
    .status(202)
    .json({ success: 'true', message: 'Contact updated successfully', data: value });
});

router.put('/:id/:block', (req: Request, res: Response) => {
  const contact = blockContact(req.params);

  if (!contact) {
    return res
      .status(406)
      .json({ success: 'false', message: 'Error, cannot block contact, contact not found' });
  }

  return res.status(200).json({
    success: 'true',
    message: `Contact is ${contact.block ? 'blocked' : 'unblocked'} successfully`,
    data: contact
  });
});

router.delete('/:id', (req: Request, res: Response) => {
  const contact = deleteContact(req);

  if (!contact)
    return res.status(404).json({ success: 'false', message: 'Error, Contact not available' });

  return res.status(200).json({
    success: 'true',
    message: 'Contact deleted successfully'
  });
});

export default router;
