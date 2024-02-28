
/**
 * @swagger
 * /register:
 *   post:
 *         summary: Register a new user
 *         description: use this api to create or register a new user
 *         responses:
 *              '201': 
 *                  description: on succesfully registering a new user
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
 *                                         example: eynbcxhcxbdsndbxcjx...
*/