import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { config } from './config.js';
import { getAllContacts, getContactsById } from './services/contacts.js';
import { renderContactsList } from './utils/renderContactsList.js';
import { renderContact } from './utils/renderContact.js';
import { welcome } from './utils/wellcome.js';

export const setupServer = () => {
  const app = express();

  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );


  app.get('/', (req, res) => {
    const accept = req.headers.accept || '';
    if (accept.includes('text/html')) {
      res.send(welcome());
    }
    res.status(200).json({ message: 'Hello. Wellcome to contacts!' });
  });

  app.get('/contacts', async (req, res, next) => {
    try {
      const contacts = await getAllContacts();

      const accept = req.headers.accept || '';
      if (accept.includes('text/html')) {
        res.send(renderContactsList(contacts));
      } else {
        res
          .status(200)
          .json({ message: 'Successfully found contacts!', data: contacts });
      }
    } catch (error) {
      next(error);
    }
  });

  app.get('/contacts/:contactId', async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const contact = await getContactsById(contactId);
      const accept = req.headers.accept || '';
      if (!contact) {
        return res.status(404).json({ message: 'Contact not found' });
      }
      if (accept.includes('text/html')) {
        res.send(renderContact(contact));
      } else {
        res.status(200).json({
          message: `Successfully found contact with id ${contactId}!`,
          data: contact,
        });
      }
    } catch (error) {
      next(error);
    }
  });

  app.use((req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

  app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
  });
};