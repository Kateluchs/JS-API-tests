import user from '../../framework/services/user'


describe('Authentication', () => {
  describe('POST /api/webclient/login', () => {
    test('Positive Authorization', async () => {
      // Arrange
      const input = { loginName: 'admin', password: '!Qwerty0' }

      // Act
      const res = await user.login(input)

      const token = res.headers['x-user-token']
      // Result
      expect(res.status).toEqual(200);
      expect(typeof token).toEqual('string')
      expect(token).toBeDefined()
      // token - рандомная строка. Утиная проверка.
      // 1. Проверить что поле существует
      // 2. Проверить что поле строка
      // 3. Проверить что поле является валидным токеном. В данном случае это JWT-токен.
      // Можно спапшотить?
    })

    test('Negative Authorization: invalid login', async () => {
      const res = await user.login({ loginName: 'admin1', password: '!Qwerty0' })

      expect(res.status).toEqual(200);
//    expect(res.body).toMatchSnapshot();
      expect(res.body).toEqual({ status: 'ACCESS_DENIED', message: 'Access denied' });
    })

    test('Negative Authorization: invalid password', async () => {
      const res = await user.login({ loginName: 'admin', password: '!qwerty0' })

      expect(res.status).toEqual(200);
      expect(res.body).toEqual({ status: 'ACCESS_DENIED', message: 'Access denied' })
    })

    test('Negative Authorization: no data', async () => {
      const res = await user.login({})

      expect(res.status).toEqual(400);
      expect(res.body).toEqual({ status: 'BAD_REQUEST', message: 'BAD_REQUEST' })
    })

    
  })
})