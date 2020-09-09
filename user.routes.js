const router = require('express').Router();
const user = require('../../controllers/user/user.controller');

router.post('/login', user.createToken);

router.post('/new', user.create);

router.post('/checkpassword', user.checkPassword);

module.exports = router;
/**
 * @swagger
 * tags:
 *   name: User
 *   description: User/Login API
 * definitions:
 *   User:
 *     type: object
 *     required:
 *       - content
 *     properties:
 *       CAT_ID:
 *         type: string
 *         example: 1
 *         description: Category ID
 *       CATEGORY:
 *         type: string
 *         example: 시술
 *         description: Category
 *       PARENT:
 *         type: string
 *         example: tab
 *         description: Category parent
 */

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: 로그인을 시도합니다.
 *     tags: [User]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               USER_ID:
 *                 type: string
 *                 example: monkb1
 *               PASSWORD:
 *                 type: string
 *                 example: 1q2w3e4r5t
 *             required:
 *               - USER_ID
 *               - PASSWORD

 *     responses:
 *       201:
 *         description: 토큰 발급 완료
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   description: 인증 결과
 *                 token:
 *                   type: string
 *                   description: 인증 토큰
 *                 user:
 *                   type: object
 *                   description: 유저 정보
 *                   properties:
 *                     USER_ID:
 *                       type: string
 *                     USER_NAME:
 *                       type: string
 *                     PHONE_NO:
 *                       type: string
 *                     ORG_CODE:
 *                       type: string
 */

/**
 * @swagger
 * /user/new:
 *   post:
 *     summary: (TO BE DEVELOPED) 회원정보를 신규로 생성합니다.
 *     tags: [User]
 *     responses:
 *       201:
 *         description: User 생성
 *         schema:
 *           type: object
 *           properties:
 *             Category:
 *               type: object
 *               $ref: '#/definitions/User'
 */
