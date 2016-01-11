# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure(2) do |config|
  # For a complete reference, please see the online documentation at
  # https://docs.vagrantup.com.

  #config.vm.box = "ubuntu/trusty64"
  config.vm.box = "repositive/trusty64-base"

  # Enable SSH Forwarding
  config.ssh.forward_agent = true

  # Provider-specific configuration
  config.vm.provider "virtualbox" do |v|
    v.name = "repositive-frontend"
    v.memory = 2048
    v.cpus = 1
    v.customize ["modifyvm", :id, "--usb", "off"]
    v.customize ["modifyvm", :id, "--usbehci", "off"]
  end

  # Create a private network, which allows host-only access to the machine
  # using a specific IP.
  config.vm.network "private_network", ip: "192.168.33.12"

  # Create a public network, which generally matched to bridged network.
  # Bridged networks make the machine appear as another physical device on
  # your network.
  # config.vm.network "public_network"

  # Share an additional folder to the guest VM. The first argument is
  # the path on the host to the actual folder. The second argument is
  # the path on the guest to mount the folder. And the optional third
  # argument is a set of non-required options.
  config.vm.synced_folder ".", "/home/vagrant/app"
  #config.vm.synced_folder "../repositive-styles", "/home/vagrant/app/bower_components/repositive-styles", disabled: false

  # Config frontend machine
  config.vm.define "frontend" do |frontend|

    frontend.vm.provision "shell" do |s|
        s.inline = "ansible-galaxy -p /home/vagrant/app/tmp/roles install -r /home/vagrant/app/ansible/requirements.yml --force"
    end

    # Provision VM with Ansible
    frontend.vm.provision "ansible" do |ansible|
        ansible.playbook = "ansible/playbook.yml"
        ansible.extra_vars = {
          ansible_ssh_user: 'vagrant',
          ansible_connection: 'ssh',
          ansible_ssh_args: '-o ForwardAgent=yes'
        }
        #ansible.verbose =  'vvvv'
        ansible.raw_ssh_args = ['-o UserKnownHostsFile=/dev/null']
    end

  end

end
