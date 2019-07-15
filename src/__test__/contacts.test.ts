import request from 'supertest';
import app from '../app';
import { Contact } from '../controllers/interfaces';

describe('TESTING CONTACT RESULTS', () => {
  it('GET ALL CONTACTS API Request', async () => {
    const contacts = await request(app).get('/contacts');
    expect(contacts.status).toEqual(200);

    expect(Array.isArray(contacts.body.data)).toBe(true);
    contacts.body.data.forEach((contact: Contact) => {
      expect(typeof contact).toEqual('object');
      // Ensure each contact is an object with the exact set of keys.
      expect(Object.keys(contact)).toEqual([
        'id',
        'firstName',
        'lastName',
        'phone',
        'email',
        'block'
      ]);

      // Validate simple property types.
      expect(typeof contact.id).toEqual('number');
      expect(typeof contact.firstName).toEqual('string');
      expect(typeof contact.lastName).toEqual('string');
      expect(typeof contact.phone).toEqual('string');
      expect(typeof contact.email).toEqual('string');
      expect(typeof contact.block).toEqual('boolean');
    });
  });

  it('GET A SINGLE CONTACT BY ID API REQUEST', async () => {
    const contact = await request(app).get('/contacts/1');
    expect(contact.status).toEqual(200);
    expect(contact.body).toEqual({
      success: 'true',
      data: expect.objectContaining({
        id: 1,
        firstName: 'Joe',
        lastName: 'Doe',
        phone: '+234-08132978120',
        email: 'Joe@gmail.com',
        block: false
      })
    });
  });

  it('GET A SINGLE CONTACT BY ID THAT DOES NOT EXIT IN DATABASE API REQUEST', async () => {
    const contact = await request(app).get('/contacts/10');
    expect(contact.status).toEqual(404);
    expect(contact.body).toEqual({ success: 'false', message: 'Error, Contact not available' });
  });

  it('POST A NEW CONTACT API REQUEST', async () => {
    const newContact = {
      firstName: 'Bond',
      lastName: 'Jake',
      phone: '+234-08132972098',
      email: 'bondjak@gmail.com'
    };

    const contact = await request(app)
      .post('/contacts')
      .send(newContact);
    expect(contact.status).toEqual(201);
    expect(contact.body).toEqual({
      success: 'true',
      message: 'Contact added successfully',
      data: expect.objectContaining({
        firstName: 'Bond',
        lastName: 'Jake',
        phone: '+234-08132972098',
        email: 'bondjak@gmail.com',
        id: 4,
        block: false
      })
    });
  });

  it('POST AN INCOMPLETE CONTACT API REQUEST', async () => {
    const newContact = {
      firstName: '',
      lastName: 'Jake',
      phone: '2972098',
      email: 'bondjak@gmail.com'
    };
    const error = await request(app)
      .post('/contacts')
      .send(newContact);
    expect(error.status).toEqual(406);
    expect(error.body).toEqual({
      success: 'false',
      message: 'Error please input right contact details',
      error: expect.arrayContaining([
        { firstName: 'firstName is not allowed to be empty' },
        { firstName: 'firstName length must be at least 3 characters long' },
        { phone: 'phone length must be at least 11 characters long' }
      ])
    });
  });

  it('PUT A CONTACT BY UPDATING EXISTING CONTACT DETAILS API REQUEST', async () => {
    const updateContact = {
      firstName: 'Decagon',
      lastName: 'Node',
      phone: '+234-8132238098',
      email: 'Node@Decagoninstitute.com'
    };
    const contact = await request(app)
      .put('/contacts/4')
      .send(updateContact);
    expect(contact.status).toEqual(202);
    expect(contact.body).toEqual({
      success: 'true',
      message: 'Contact updated successfully',
      data: expect.objectContaining({
        firstName: 'Decagon',
        lastName: 'Node',
        phone: '+234-8132238098',
        email: 'Node@Decagoninstitute.com',
        id: 4,
        block: false
      })
    });
  });

  it('PUT A NON EXISTING CONTACT API REQUEST', async () => {
    const newContact = {
      firstName: 'Luke',
      lastName: 'Jake',
      phone: '+234-8132238098',
      email: 'bondjak@gmail.com'
    };
    const error = await request(app)
      .put('/contacts/10')
      .send(newContact);
    expect(error.status).toEqual(404);
    expect(error.body).toEqual({
      success: 'false',
      message: 'Error, Contact not available'
    });
  });

  it('DELETE AN EXISTING CONTACT API REQUEST', async () => {
    const contact = await request(app).delete('/contacts/4');
    expect(contact.status).toEqual(200);
    expect(contact.body).toEqual({
      success: 'true',
      message: 'Contact deleted successfully'
    });
  });

  it('DELETE A NON EXISTING CONTACT API REQUEST', async () => {
    const contact = await request(app).delete('/contacts/10');
    expect(contact.status).toEqual(404);
    expect(contact.body).toEqual({
      success: 'false',
      message: 'Error, Contact not available'
    });
  });

  it('PUT BLOCK A CONTACT API REQUEST', async () => {
    const contact = await request(app).put('/contacts/1/true');
    expect(contact.status).toEqual(200);
    expect(contact.body).toEqual({
      message: 'Contact is blocked successfully',
      success: 'true',
      data: expect.objectContaining({
        block: true,
        email: 'Joe@gmail.com',
        firstName: 'Joe',
        id: 1,
        lastName: 'Doe',
        phone: '+234-08132978120'
      })
    });
  });

  it('PUT UNBLOCK A CONTACT API REQUEST', async () => {
    const contact = await request(app).put('/contacts/1/false');
    expect(contact.status).toEqual(200);
    expect(contact.body).toEqual({
      message: 'Contact is unblocked successfully',
      success: 'true',
      data: expect.objectContaining({
        block: false,
        email: 'Joe@gmail.com',
        firstName: 'Joe',
        id: 1,
        lastName: 'Doe',
        phone: '+234-08132978120'
      })
    });
  });

  it('PUT BLOCK A NON EXITING CONTACT API REQUEST', async () => {
    const contact = await request(app).put('/contacts/10/false');
    expect(contact.status).toEqual(406);
    expect(contact.body).toEqual({
      message: 'Error, cannot block contact, contact not found',
      success: 'false'
    });
  });
});
