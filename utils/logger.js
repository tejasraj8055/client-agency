import dayjs from 'dayjs'

const logger = (req, res, next) => {
  console.log(
    dayjs(Date.now()).format('DD-MMM-YYYY THH:mm:ss SSS [Z] A'),
    `-${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`
  );
  next();
};

export default logger;
