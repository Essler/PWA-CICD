#!/usr/bin/env bash
set -e
tar -czvf ../custom-notifications.tar.gz *
curl -vvvvi -H 'X-JFrog-Art-Api: AKCp5aTGtaUJYU4RbTSq9C75TKF5TYEe2Y1xZqamPLoTkbVG3vuHq8G2e7hK1P4JfAPkBAv7d' -T ../custom-notifications.tar.gz "http://artifacts.sandbox.west.com/artifactory/Hackathon/custom-notifications.tar.gz"
