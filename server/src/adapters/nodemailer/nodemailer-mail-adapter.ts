import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "bbe1f15f29ddfd",
    pass: "46661b9e8d5738"
  }
});


export class NodemailerMailAdapter implements MailAdapter{
  async sendMail({subject, body}: SendMailData){
    await transport.sendMail({
      from: 'Equipe Feedget <oi@widget.com>',
      to: 'Christian Prenholato <christianprenholato10@gmail.com>',
      subject,
      html: body
    })
  };
}