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
    aws ecs update-service --service testci-dev --task-definition $revision
    #oldTask=$(aws ecs list-tasks | $JQ '.taskArns[0]');
    #aws ecs stop-task --task $oldTask
    return 0
}

make_task_def(){
	task_template='[
		{
			"name": "testci-dev",
			"image": "%s/testci:%s",
			"essential": true,
			"memory": 200,
			"cpu": 10,
			"portMappings": [
				{
					"containerPort": 3000,
					"hostPort": 3000
				}
			]
		}
	]'
	
	task_def=$(printf "$task_template" $DOCKER_USER_ID $CIRCLE_BUILD_NUM)
}

push_ecr_image(){
	docker push $DOCKER_USER_ID/testci:$CIRCLE_BUILD_NUM
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
