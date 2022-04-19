const replace = require('replace-in-file');
const moment = require('moment');
const timeStamp = moment(new Date()).format("YYYY/MM/DD HH:mm:ss");

const exec = require('child_process').exec;
const fs = require('fs');


function createBuildTimeStamp(){

  try {

    const options = {
      files: [
        'src/environments/environment.ts',
        'src/environments/environment.prod.ts',
      ],
      from: /buildTime: '(.*)'/g,
      to: "buildTime: '" + timeStamp + "'",
      allowEmptyPaths: false,
    };
    let changedFiles = replace.sync(options);
    if (changedFiles == 0) {
      throw "Please make sure that the file '" + options.files + "' has \"timeStamp: ''\"";
    }
    console.log('Build timestamp is set to: ' + timeStamp);
    createGitCommitHash();
  } catch (error) {
    console.error('Error occurred:', error);
    throw error
  }
}
function createGitCommitHash(){
  require('child_process').exec('git rev-parse --short HEAD', function(err, stdout) {
  //  console.log('Last commit hash on this branch is:', stdout);

    try {

      const options = {
        files: [
          'src/environments/environment.ts',
          'src/environments/environment.prod.ts',
        ],
        from: /gitHash: '(.*)'/g,
        to: "gitHash: '" + stdout.trim() + "'",
        allowEmptyPaths: false,
      };

      let changedFiles = replace.sync(options);
      if (changedFiles == 0) {
        throw "Please make sure that the file '" + options.files + "' has \"gitHash: ''\"";
      }
      console.log('Build gitHash is set to: ' + stdout.trim());
    } catch (error) {
      console.error('Error occurred:', error);
      throw error
    }
  });
}

createBuildTimeStamp();
