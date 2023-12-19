//Documentation for mentorCode project
const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "MentorCode API",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:7000",
        description: "localhost",
      },
    ],
    securityDefinitions: {
      BearerAuth: {
        type: "apiKey",
        name: "Authorization",
        scheme: "bearer",
        in: "header",
      },
    },
  },
  apis: ["./routers/*.js"],
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;
