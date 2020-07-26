module.exports = {
  apps : [{
    name: 'weather',
    script: './weather-today-server/bin/www',
    watch: './weather-today-server',
    env: {
      'NODE_ENV': 'production'
    },
    log_file: './weather-today-server/data/logs/stdout.log'
  },/* {
    script: './service-worker/',
    watch: ['./service-worker']
  }*/],

  deploy : {
    production : {
      user : 'SSH_USERNAME',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
