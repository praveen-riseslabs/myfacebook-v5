
/**
 * @swagger
 * /user/register:
 *   post:
 *         tags:
 *            - User
 *         summary: Register a new user
 *         description: use this api to create or register a new user
 *         requestBody:
 *                   description: Create a new user
 *                   required: true
 *                   content:
 *                       application/json:
 *                            schema:
 *                               type : object
 *                               properties:
 *                                  username :
 *                                         type: string
 *                                         example: exampleUser
 *                                  email :
 *                                         type: string
 *                                         example: example@gmail.com
 *                                  password: 
 *                                          type: string 
 *                                          example: abcd1234 
 *                                  confirmPassword: 
 *                                          type: string
 *                                          example: abcd1234
 *         responses:
 *              '201': 
 *                  description: on succesfully registering
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              type : object
 *                              properties:
 *                                  username :
 *                                         type: string
 *                                         example: exampleUser
 *                                  email :
 *                                         type: string
 *                                         example: example@gmail.com
 *                                  token :
 *                                         type: string
 *                                         example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 * /user/login:
 *   post:
 *         tags:
 *            - User
 *         summary: Login existing user
 *         description: use this api to login existing user
 *         requestBody:
 *                   description: login existing user
 *                   required: true
 *                   content:
 *                       application/json:
 *                            schema:
 *                               type : object
 *                               properties:
 *                                  usernameOrEmail :
 *                                         type: string
 *                                         example: exampleUser
 *                                  password: 
 *                                          type: string 
 *                                          example: abcd1234 
 *         responses:
 *              '201': 
 *                  description: on succesfully login
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              type : object
 *                              properties:
 *                                  username :
 *                                         type: string
 *                                         example: exampleUser
 *                                  email :
 *                                         type: string
 *                                         example: example@gmail.com
 *                                  token :
 *                                         type: string
 *                                         example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
*/