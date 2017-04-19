#!/usr/bin/env bash

# more bash-friendly output for jq
JQ="jq --raw-output --exit-status"

configure_aws_cli(){
	aws --version
	aws configure set default.region $AWS_DEFAULT_REGION
	aws configure set default.output json
}

deploy_cluster() {

    family="testci-dev"

    make_task_def
    register_definition
    if [[ $(aws ecs update-service --cluster testci-dev-cluster --service testci-dev --task-definition $revision | \
                   $JQ '.service.taskDefinition') != $revision ]]; then
        echo "Error updating service."
        return 1
    fi

    echo "Deployed!"
    return 0
}

make_task_def(){
	task_template='[
		{
			"name": "testci-dev",
			"image": "%s/testci:%s.%s",
			"essential": true,
			"memory": 200,
			"cpu": 10,
            "environment" : [
                {
                    "name" : "NODE_ENV", 
                    "value" : "dev"
                },
                {
                    "name" : "MONGO_URI",
                    "value" : "%s"
                },
                                {
                    "name" : "GOOGLE_API_CLIENT_ID",
                    "value" : "%s"
                },
                {
                    "name" : "GOOGLE_API_SECRET",
                    "value" : "%s"
                },
                {
                    "name" : "SITE_URL",
                    "value" : "%s"
                },
                {
                    "name" : "AWS_ACCESS_KEY_ID",
                    "value" : "%s"
                },
                {
                    "name" : "AWS_SECRET_ACCESS_KEY",
                    "value" : "%s"
                }
            ],
			"portMappings": [
				{
					"containerPort": 3001,
                    "hostPort" : 3001
				}
			]
		}
	]'
	
	task_def=$(printf "$task_template" $DOCKER_USER_ID $APP_VERSION $CIRCLE_BUILD_NUM $MONGO_URI_DEV $GOOGLE_API_CLIENT_ID $GOOGLE_API_SECRET $SITE_URL_DEV $AWS_ACCESS_KEY_ID $AWS_SECRET_ACCESS_KEY)
}

push_ecr_image(){
	docker push $DOCKER_USER_ID/testci:$APP_VERSION.$CIRCLE_BUILD_NUM
}

register_definition() {

    if revision=$(aws ecs register-task-definition --container-definitions "$task_def" --family $family | $JQ '.taskDefinition.taskDefinitionArn'); then
        echo "Revision: $revision"
    else
        echo "Failed to register task definition"
        return 1
    fi

}

configure_aws_cli
push_ecr_image
deploy_cluster
