import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';

import { resolve } from 'path';

import mailConfig from '../config/mail';

class Mail {
  constructor() {
    this.transporter = nodemailer.createTransport(mailConfig);

    const compileConfig = hbs({
      viewEngine: {
        extname: '.hbs',
        partialsDir: resolve(__dirname, '..', 'views', 'partials'),
        layoutsDir: resolve(__dirname, '..', 'views', 'layouts'),
        defaultLayout: 'default.hbs',
      },
      viewPath: resolve(__dirname, '..', 'views'),
      extName: '.hbs',
    });
    this.transporter.use('compile', compileConfig);
  }

  send({ to, subject, template, context }) {
    return this.transporter.sendMail({
      from: 'FastFeet Team <noreplay@fastfeet.com.br>',
      to,
      subject,
      template,
      context,
    });
  }
}

export default new Mail();
