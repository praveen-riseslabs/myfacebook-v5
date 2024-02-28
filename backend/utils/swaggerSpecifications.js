import swaggerJSDoc from "swagger-jsdoc";

const port = process.env.PORT

export const swaggerSpecs = swaggerJSDoc({
  definition: {
    openapi: "3.0.3",
    info: {
      title: "My facebook App V1",
      version: "1.0.0",
    },
    servers: [{ url: `http://localhost:${port}/api/v1` }],
  },
  apis: ["./index.js", "./routes/userRoutes.js"],
});
