import db from '../../db/db';
import Joi from 'joi';

import { Contact, Request, BlockContact } from './interfaces';

const schema = {
  id: Joi.number().required(),
  firstName: Joi.string()
    .min(3)
    .max(20)
    .required(),
  lastName: Joi.string()
    .min(3)
    .max(20)
    .required(),
  phone: Joi.string()
    .min(11)
    .required(),
  email: Joi.string().required(),
  block: Joi.boolean().required()
};

export function getContacts(): Contact[] {
  return db;
}

export function getContact(contactId: string): Contact | undefined {
  return db.find(contact => contact.id === parseFloat(contactId));
}

export function addContact(body: Contact) {
  const contact = body;
  contact.id = db.length + 1;
  contact.block = false;

  let errorMessages: object[] | null = null;

  const { error, value } = Joi.validate<Contact>(contact, schema, {
    abortEarly: false,
    skipFunctions: true
  });

  if (error) {
    errorMessages = error.details.map(errMsg => ({
      [errMsg.path[0]]: errMsg.message.replace(/"/g, '')
    }));
    return { errorMessages };
  }

  db.push(value);
  return { value };
}

export function editContact({ body, params }: Request) {
  const { id: contactId } = params;

  const contact = getContact(contactId);

  if (!contact) {
    const contact = 'Not Found';
    return { contact };
  }

  let errorMessages: object[] | null = null;

  body.firstName = body.firstName || contact.firstName;
  body.lastName = body.lastName || contact.lastName;
  body.email = body.email || contact.email;
  body.phone = body.phone || contact.phone;
  body.id = contact.id;
  body.block = contact.block;

  const { error, value } = Joi.validate<Contact>(body, schema, {
    abortEarly: false,
    skipFunctions: true
  });

  if (error) {
    errorMessages = error.details.map(errMsg => ({
      [errMsg.path[0]]: errMsg.message.replace(/"/g, '')
    }));

    return { errorMessages };
  }

  contact.firstName = value.firstName;
  contact.lastName = value.lastName;
  contact.email = value.email;
  contact.phone = value.phone;

  return { value };
}

export function deleteContact({ params }: Request): Contact[] | undefined {
  const { id: contactId } = params;

  const contact = db.findIndex(contact => contact.id === parseFloat(contactId));

  if (contact < 0) return;

  return db.splice(contact, 1);
}

export function blockContact({ id: contactId, block }: BlockContact): Contact | undefined {
  const contact = getContact(contactId);

  if (!contact) return;

  contact.block = block.toLowerCase() === 'true' ? true : false;

  return contact;
}
