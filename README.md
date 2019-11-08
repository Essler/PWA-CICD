# Welcome to Mavericks Hackathon Presentation.

The application is routed in Pivotal through this URL:
 - https://custom-notifications.app.pcfdev.one.west.com/
 

Maverick-Pipeline is set up in Concourse.
 - https://apps-concourse.pcfdev.one.west.com/teams/Hackathon/pipelines/Mavericks-Pipeline

The pipeline pulls from this github repository.

The pipeline then deploys the code to Pivotal Cloud Foundry.
 - https://account.sys.pcfdev.one.west.com/z/uaa/identity/apps

The pipeline would also save a tar.gz of the app as an artifact in Artifactory.
 - http://artifacts.sandbox.west.com/artifactory/webapp/#/artifacts/browse/tree/General/Hackathon/custom-notifications.tar.gz
 
There is a firewall between Concourse and Artifactory.

 - This prevents us from saving artifacts with Artifactory in Concourse.

 - In order to do this manually, we execute a command from git-bash.

 - To save to Artifactory:
  1. open git-bash
  1. checkout this repository
  1. navigate to the Mavericks directory
  1. execute ./save-to-artifactory.sh
  


