dir_path=$(dirname $(realpath $0))

source $dir_path/../.env.deploy.local

echo Deploying project: $DENO_PROJECT

deployctl deploy \
  --project=$DENO_PROJECT \
  --token=$DENO_DEPLOY_TOKEN \
  --include=src,import-map.json,.env \
  --import-map=import-map.json \
  --no-static \
  --prod \
  --allow-sys \
  --entrypoint=src/deno/server.ts \
  $@
