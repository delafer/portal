# -*- coding: utf-8 -*-
# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure(2) do |config|
  # The most common configuration options are documented and commented below.
  # For a complete reference, please see the online documentation at
  # https://docs.vagrantup.com.

  # Every Vagrant development environment requires a box. You can search for
  # boxes at https://atlas.hashicorp.com/search.
	config.vm.box = "bento/ubuntu-18.04"

  # Disable automatic box update checking. If you disable this, then
  # boxes will only be checked for updates when the user runs
  # `vagrant box outdated`. This is not recommended.
 config.vm.box_check_update = false

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine. In the example below,
  # accessing "localhost:8080" will access port 80 on the guest machine.
  # config.vm.network "forwarded_port", guest: 80, host: 8080

  # Create a private network, which allows host-only access to the machine
  # using a specific IP.
  # config.vm.network "private_network", ip: "192.168.33.10"

  # Create a public network, which generally matched to bridged network.
  # Bridged networks make the machine appear as another physical device on
  # your network.
  config.vm.network "public_network"

  # Variante zu obiger Zeile, die das Standard-Linux Network Interface auswM-CM-$hlt.
  # FM-CM-<r Windows mM-CM-<sste hinter bridge: etwas anderes stehen...TODO: Geht es
  # allgemeingM-CM-<ltig?
  #  config.vm.network "public_network", bridge:"eth0"

  # Vergabe eines Hostnames, falls eine VM von auM-CM-^_en unter einem "schM-CM-6nen"
  # Namen erreichbar sein soll. TODO: Wie bei "vagrant up" setzbar?
  config.vm.hostname = "hackathonVM-#{ENV['HOSTNAME']}"

  # Share an additional folder to the guest VM. The first argument is
  # the path on the host to the actual folder. The second argument is
  # the path on the guest to mount the folder. And the optional third
  # argument is a set of non-required options.
  # config.vm.synced_folder "../data", "/vagrant_data"

  # Provider-specific configuration so you can fine-tune various
  # backing providers for Vagrant. These expose provider-specific options.
  # Example for VirtualBox:
  #
  config.vm.provider "virtualbox" do |vb|
  #   # Display the VirtualBox GUI when booting the machine
  #   vb.gui = true
  #
    # Customize the amount of memory on the VM:
    vb.memory = "8192"
    vb.cpus = 3
    #vb.customize ["modifyhd", "5e215e98-b05f-41e5-b813-4d18ad362628", "--resize", "size in megabytes"]
	# set default nic type:
	vb.default_nic_type = "82543GC"
  end
  #
  # View the documentation for the provider you are using for more
  # information on available options.

  # Define a Vagrant Push strategy for pushing to Atlas. Other push strategies
  # such as FTP and Heroku are also available. See the documentation at
  # https://docs.vagrantup.com/v2/push/atlas.html for more information.
  # config.push.define "atlas" do |push|
  #   push.app = "YOUR_ATLAS_USERNAME/YOUR_APPLICATION_NAME"
  # end

  # enable proxy, to walk throw corporate proxy:
  # if Vagrant.has_plugin?("vagrant-proxyconf")
  #     config.proxy.http     = "http://11.10.2.2:3128/"
  #     config.proxy.https    = "http://11.10.2.2:3128/"
  #     config.proxy.no_proxy = "\"localhost, 127.0.0.1, pc10004078\""
  # else
  #     raise 'Necessary plugin vagrant-proxyconf is not installed!'
  # end

  # Enable provisioning with a shell script. Additional provisioners such as
  # Puppet, Chef, Ansible, Salt, and Docker are also available. Please see the
  # documentation for more information about their specific syntax and use.
    config.vm.provision "shell", inline: <<-SHELL
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
    curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
    sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
    sudo add-apt-repository "deb [arch=amd64] http://apt.kubernetes.io/ kubernetes-xenial main"
    sudo apt-get update
    sudo apt-get upgrade -y
    sudo apt-get install -y \
      apt-transport-https \
      alien \
      cvs \
      docker-ce=18.06.1~ce~3-0~ubuntu \
      kubeadm \
      kubectl \
      kubelet \
      libaio1 \
      maven \
      mercurial \
      openjdk-11-jdk-headless \
      python-pip \
      unzip \
      zip
	  # --proxy=http://11.10.2.2:3128
      sudo pip install docker-compose
      curl -sL https://ibm.biz/idt-installer | bash

      # get and install java:
      # echo "Installing Java"
      # curl -O --silent "ftp://abcdef001.javasoft.org/pub/tools/java/jdk-7u80-linux-x64.tar.gz"
      # sudo mkdir /opt/Oracle_Java
      # sudo tar xfz jdk-7u80-linux-x64.tar.gz -C /opt/Oracle_Java/
      # rm jdk-7u80-linux-x64.tar.gz
      # sudo update-alternatives --install "/usr/bin/java" "java" "/opt/Oracle_Java/jdk1.7.0_80/bin/java" 1
      # sudo update-alternatives --install "/usr/bin/javac" "javac" "/opt/Oracle_Java/jdk1.7.0_80/bin/javac" 1
      # sudo update-alternatives --install "/usr/bin/javaws" "javaws" "/opt/Oracle_Java/jdk1.7.0_80/bin/javaws" 1
      # sudo update-alternatives --install "/usr/bin/jar" "jar" "/opt/Oracle_Java/jdk1.7.0_80/bin/jar" 1
      # sudo update-alternatives --set "java" "/opt/Oracle_Java/jdk1.7.0_80/bin/java"
      # sudo update-alternatives --set "javac" "/opt/Oracle_Java/jdk1.7.0_80/bin/javac"
      # sudo update-alternatives --set "javaws" "/opt/Oracle_Java/jdk1.7.0_80/bin/javaws"
      # sudo update-alternatives --set "jar" "/opt/Oracle_Java/jdk1.7.0_80/bin/jar"
      # # install wlst:
      # echo "Installing WLST"
      # curl -O --silent ftp://abcdef001.javasoft.org/pub/tools/java/wls1213_dev_update3.zip
      # sudo mkdir /opt/Oracle_Weblogic
      # sudo unzip -q wls1213_dev_update3.zip -d /opt/Oracle_Weblogic/
      # echo "Configuring Weblogic (minutes ...)"
      # sudo -- sh -c 'export JAVA_HOME=/opt/Oracle_Java/jdk1.7.0_80
  #     ^Iexport MW_HOME=/opt/Oracle_Weblogic/wls12130
 #      ^Icd /opt/Oracle_Weblogic/wls12130
 #      ^Iecho "n" | . ./configure.sh
 #      '
    cat << END-DOCKER_CONFIG > /etc/docker/daemon.json
{
    "insecure-registries" : [ "xyz035.javasoft.org:5000" ]
}
END-DOCKER_CONFIG
    sudo service docker stop
    sudo service docker start
    sudo usermod -aG docker vagrant
	sudo swapoff -a
	sudo sed -i '/ swap / s/^\\(.*\\)$/#\\1/g' /etc/fstab
	sudo sed -i '0,/ExecStart=/s//Environment="KUBELET_EXTRA_ARGS=--cgroup-driver=cgroupfs"\\n&/' /etc/systemd/system/kubelet.service.d/10-kubeadm.conf
	IPADDR=`ifconfig eth1 | grep netmask | awk '{print $2}'| cut -f2 -d:`
	NODENAME=$(hostname -s)
	# sudo kubeadm init --apiserver-cert-extra-sans=$IPADDR  --node-name $NODENAME
	# sudo kubeadm init --apiserver-cert-extra-sans=$IPADDR
	sudo kubeadm init --pod-network-cidr=10.127.0.0/16 --apiserver-advertise-address=$IPADDR
	sudo --user=vagrant mkdir -p /home/vagrant/.kube
	sudo cp /etc/kubernetes/admin.conf /home/vagrant/.kube/config
	sudo chown $(id -u vagrant):$(id -g vagrant) /home/vagrant/.kube/config
	echo "#######################################################################################"
	echo "###### For the hackathon forget what you read about pod network above this line! ######"
	echo "###### Run once the following command as vagrant instead: ./superkubectl init    ######"
	echo "#######################################################################################"
	cat << END-SCRIPT > /home/vagrant/superkubectl
#!/bin/sh
case "\\${1}" in
    (init)
        kubectl taint nodes --all node-role.kubernetes.io/master-
		kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml
		;;
	(reset)
	    sudo kubeadm reset
		;;
    (setup)
	    IPADDR=\\`ifconfig eth1 | grep netmask | awk '{print \\$2}'| cut -f2 -d:\\`
		sudo kubeadm init --pod-network-cidr=10.127.0.0/16 --apiserver-advertise-address=\\$IPADDR
		sudo cp -i /etc/kubernetes/admin.conf /home/vagrant/.kube/config
		sudo chown vagrant:vagrant /home/vagrant/.kube/config
		;;
	(*)
	    echo "\\${0} usage:\\n    \\${0} init     /* initialize pod network */\\n    \\${0} reset     /* erase kubernetes installation */\\n    \\${0} setup     /* build up kubernetes installation */"
		;;

esac
END-SCRIPT
	chmod ug+x /home/vagrant/superkubectl
	sudo chown $(id -u vagrant):$(id -g vagrant) /home/vagrant/superkubectl
	mkdir /home/vagrant/.m2
	cat << END-SETTINGS > /home/vagrant/.m2/settings.xml
<?xml version="1.0" encoding="UTF-8"?>
<settings>
	<profiles>
		<profile>
			<id>build-local-dev</id>
			<repositories>
				<repository>
					<id>maven-central</id>
					<url>https://repo.maven.apache.org/maven2</url>
				</repository>
				<repository>
					<snapshots>
						<enabled>false</enabled>
					</snapshots>
					<id>central</id>
					<name>libs-release</name>
					<url>http://artifactory.javasoft.org/artifactory/libs-release</url>
				</repository>
				<repository>
					<snapshots>
						<enabled>false</enabled>
					</snapshots>
					<id>central-local</id>
					<name>libs-release-local</name>
					<url>http://artifactory.javasoft.org/artifactory/libs-release-local</url>
				</repository>
				<repository>
					<snapshots/>
					<id>snapshots</id>
					<name>libs-snapshot</name>
					<url>http://artifactory.javasoft.org/artifactory/libs-snapshot</url>
				</repository>
			</repositories>
			<pluginRepositories>
				<pluginRepository>
					<snapshots>
						<enabled>false</enabled>
					</snapshots>
					<id>central</id>
					<name>plugins-release</name>
					<url>http://artifactory.javasoft.org/artifactory/plugins-release</url>
				</pluginRepository>
				<pluginRepository>
					<snapshots/>
					<id>snapshots</id>
					<name>plugins-snapshot</name>
					<url>http://artifactory.javasoft.org/artifactory/plugins-snapshot</url>
				</pluginRepository>
			</pluginRepositories>
		</profile>
	</profiles>
	<activeProfiles>
		<activeProfile>build-local-dev</activeProfile>
	</activeProfiles>
</settings>
END-SETTINGS
  sudo chown $(id -u vagrant):$(id -g vagrant) /home/vagrant/.m2 /home/vagrant/.m2/settings.xml
  SHELL
end


