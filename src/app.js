const express = require('express');
const helmet = require('helmet');
const app = express();

app.disable('x-powered-by');
// app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    styleSrc: ["'self'", 'maxcdn.bootstrapcdn.com']
  }
}));

app.use(helmet.frameguard({action: 'sameorigin'}));

app.use(helmet.hsts({
  maxAge: 518400
}))

app.use(helmet.noSniff());

app.use(helmet.referrerPolicy({policy: 'same-origin'}));

app.use(helmet.xssFilter());

app.use('/user', (req,res,next) => {
  res.status(200).send({
    user: {
      id: '101',
      name: 'User1'
    }
  })
})

app.listen(3000, () => {
  console.log('----Server is running at port 3000----');
})
