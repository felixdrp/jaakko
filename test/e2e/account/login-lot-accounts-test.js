const exec = require('child_process').exec;
import chai from 'chai'
import { should, expect } from 'chai'

const command = 'node_modules/babel-cli/bin/babel-node.js test/e2e/account/login-account-test.js'

describe('Account:', () => {
  describe('Login:', () => {
    it('Login 20 accounts in parallel', function() {
      // Register 20 accounts :)
      for (let i = 1; i < 21; i++) {
        exec(`${command} ${i}`, (error, stdout, stderr) => {
          if (error) {
            console.error(`exec error: ${error}`);
            return;
          }
          console.log(`stdout: ${stdout}`);
          console.log(`stderr: ${stderr}`);
        });
      }

    });
  });
});
