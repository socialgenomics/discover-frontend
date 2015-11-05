#!/usr/bin/env bash
# Installs Ansible and plugins in the Vagrant VM before running the main
# provisioner.

DEBIAN_FRONTEND=noninteractive sudo apt-get update && sudo apt-get install -y python-pip
sudo pip install -q ansible==1.9.4
cd /home/vagrant/app
mkdir -p tmp/roles
ansible-galaxy -p tmp/roles install -r ansible/requirements.yml --force
