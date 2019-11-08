fly -t gcp destroy-pipeline -p Mavericks-Pipeline
fly -t gcp set-pipeline -p Mavericks-Pipeline -c pipeline.yml -l custom-notifications-properties.yml --load-vars-from credentials.yml
fly -t gcp unpause-pipeline -p Mavericks-Pipeline