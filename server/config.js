const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/guz_course_app',
  /*mongoURL: 'mongodb://Username:Password@jello.modulusmongo.net:27017/rywo4juQ',*/
  port: process.env.PORT || 8000,
  UPLOADS_DIR: 'uploads'
};

export default config;
