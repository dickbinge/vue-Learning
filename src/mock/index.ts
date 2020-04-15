const Mock = require('mockjs');

const nameList = Mock.mock({
  'list|10': [
    {
      'id|+1': 0,
      name: '@cname',
      'score|20-100': 100,
      'sex|1': ['男', '女'],
    }
  ],
});

Mock.mock(/goods\/list/, 'post', () => ({
  code: 0,
  message: 'success',
  data: nameList,
}));