# !/bin/bash
echo "Please type in your password if prompted.";
echo "Checking root access...";
sudo -l > /dev/null || {
  if [ `whoami` != root ]; then
    echo "No root privileges detected. Aborting...;"
    exit 1;
  else
    sudo || apt update && apt install sudo;
  fi
}
sudo apt update;
sudo apt upgrade -y;
echo "checking mongodb installation...";
{
    mongod --version > /dev/null &&
    mongosh --version > /dev/null &&
    mongoimport --version > /dev/null &&
    echo "mongodb installed"
} || {
    echo "mongodb, mongosh, and/or mongodb database tools not installed. Installing...";
    sudo apt install wget gnupg -y;
    wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -;
    echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list;
    sudo apt update;
    sudo apt install mongodb-mongosh mongodb-database-tools -y;
    echo "mongosh and mongodb database tools installed.";
    {
      mongod --version > /dev/null &&
      echo "existing mongodb installation found. Not upgrading as corruption may be caused.";
    } || {
      sudo apt install mongodb-org-server -y;
    }
}
sudo mkdir -p /data/db;
sudo chmod -R 0777 /data/db;
echo "Install/upgrading nodejs to the latest LTS version...";
sudo apt install curl -y;
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -;
sudo apt update;
sudo apt install nodejs -y;
sudo corepack enable;
echo "installing latest version of yarn...";
curl --compressed -o- -L https://yarnpkg.com/install.sh | bash;
echo "enabling mongod autostart...";
sudo systemctl enable mongod || echo "systemctl not available. Using service.";
echo "starting mongod...";
sudo systemctl start mongod || sudo service mongod start || {
  echo "failed to start mongod using service. Using immortal." &&
  curl -s https://packagecloud.io/install/repositories/immortal/immortal/script.deb.sh | sudo bash &&
  sudo apt update &&
  sudo apt install immortal &&
  immortal mongod
}
echo "installing dependencies...";
yarn install;
echo "setting up mongodb...";
node mongo-setup.js;
read -p "Configure environment variables here (If you do not, you will have to do so manually.)? " reply;
if [ $reply = "y" ]; then
  read -p "MongoDB connection string: " reply;
  echo "DB_URI=$reply" > .env.save;
  read -p "Mailgun api key: " reply;
  echo "mailgun_key=$reply" >> .env.save;
  read -p "Domain: " reply;
  echo "domain=$reply" >> .env.save;
  read -p "Port (that metahkg will run on): " reply;
  echo "port=$reply" >> .env.save;
  read -p "hCaptcha secret: " reply;
  echo "hcaptchasecret=$reply" >> .env.save;
  read -p "hCaptcha site key: " reply;
  echo "REACT_APP_hcaptchasitekey=$reply" >> .env.save;
  read -p "AWS Region: " reply;
  echo "awsRegion=$reply" >> .env.save;
  read -p "s3 Bucket name: " reply;
  echo "s3Bucket=$reply" >> .env.save;
  {
    test -f .env &&
    echo ".env found. Saving configuration to .env.save"
  } || {
    mv .env.save .env
  }
else
  {
    test -f .env &&
    echo ".env found. Not copying templates/template.env to .env"
  } || {
    echo "Copying templates/template.env to .env...";
    cp templates/template.env .env;
  }
  echo "Please configure your environmental variables using a .env file. Reference templates/template.env for details."
fi
echo "Setup complete.";
echo "Run 'yarn run deploy' to deploy the app.";