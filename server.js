require('dotenv').config(); // Para usar variables de entorno en .env
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para servir archivos estáticos
app.use(express.static('doc_html'));

// Middleware para parsear el body del formulario
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Ruta para procesar el formulario de contacto
app.post('/contacto', async (req, res) => {
  const { nombre, email, mensaje } = req.body;

  // Aquí puedes manejar los datos, por ejemplo enviarlos a un correo:
  // Configura en tu .env las variables: EMAIL_USER, EMAIL_PASS

  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    // Configurar el transporter de nodemailer
    let transporter = nodemailer.createTransport({
      service: 'Gmail', // o el servicio que uses
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: `"Slaasa Web" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // tu mismo correo para recibir el mensaje
      subject: 'Nuevo mensaje de contacto - Slaasa',
      text: `Nombre: ${nombre}\nEmail: ${email}\nMensaje: ${mensaje}`
    };

    try {
      await transporter.sendMail(mailOptions);
      return res.redirect('/contacto.html?enviado=1');
    } catch (error) {
      console.error('Error enviando correo:', error);
      return res.redirect('/contacto.html?enviado=0');
    }
  } else {
    // Si no configuraste el correo, solo imprime en consola
    console.log('Mensaje recibido:', { nombre, email, mensaje });
    return res.redirect('/contacto.html?enviado=1');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});