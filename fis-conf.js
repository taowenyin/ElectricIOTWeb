fis.match('/dist/ElectricIOTWeb/**', {
  deploy: fis.plugin('http-push', {
    receiver: 'http://172.81.239.174:8999/receiver',
    //远端目录
    to: '/var/www/html'
  })
});
