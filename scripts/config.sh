
PROJECT_DIR=$(pwd)

APP_NAME=$(node -e 'console.log(require("'$PROJECT_DIR'/package.json").name)')
