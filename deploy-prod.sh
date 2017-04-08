#!/usr/bin/env bash

# more bash-friendly output for jq
JQ="jq --raw-output --exit-status"

configure_aws_cli(){
	aws --version
	aws configure set default.region $AWS_DEFAULT_REGION
	aws configure set default.output json
}

deploy_cluster() {

    family="testci-prod"

    make_task_def
    register_definition
    if [[ $(aws ecs update-service --cluster default --service testci-prod --task-definition $revision | \
                   $JQ '.service.taskDefinition') != $revision ]]; then
        echo "Error updating service."
        return 1
    fi

    # wait for older revisions to disappear
    # not really necessary, but nice for demos
    for attempt in {1..30}; do
        if stale=$(aws ecs describe-services --cluster default --services testci-prod | \
                       $JQ ".services[0].deployments | .[] | select(.taskDefinition != \"$revision\") | .taskDefinition"); then
            echo "Waiting for stale deployments:"
            echo "$stale"
            sleep 5
        else
            echo "Deployed!"
            return 0
        fi
    done
    echo "Service update took too long."
    return 1
}

make_task_def(){
	task_template='[
		{
			"name": "testci-prod",
			"image": "%s/testci:%s.%s",
			"essential": true,
			"memory": 200,
			"cpu": 10,
            "environment" : [{
                "name" : "NODE_ENV",
                "value" : "prod"
            }],
			"portMappings": [
				{
					"containerPort": 3001,
					"hostPort": 3001
				}
			]
		}
	]'
	
	task_def=$(printf "$task_template" $DOCKER_USER_ID $APP_VERSION $CIRCLE_BUILD_NUM)
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
