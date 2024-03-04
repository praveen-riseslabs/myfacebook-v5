import swaggerJSDoc from "swagger-jsdoc";

const port = process.env.PORT
const baseUrl = `http://localhost:${port}`

export const swaggerSpecs = swaggerJSDoc({
  definition: {
    openapi: "3.0.3",
    info: {
      title: "My Facebook App V1",
      version: "1.0.0",
    },
    tags:[
      {name: "User", description: "Operations related to user"},
      {name: "Document", description: "Operations related to myDocuments"},
    ],
    servers: [{ url: `${baseUrl}/api/v1` }],
  },
  apis: ["./swagger/schemas.yml", "./swagger/user.yml", "./swagger/document.yml"],
});
