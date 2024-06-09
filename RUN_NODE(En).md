## How to Run the Timechain Node for the Analog Project

### Note Before Proceeding
Currently, the project has an open registration form for running nodes, so you only need to complete up to step 2 to have enough information to submit the form.

You can proceed further only after being selected.

### 1. Preparation

To run a node for the project, you need to prepare a computer or VPS with the following configuration: CPU 8 cores, RAM 16GB, and STORAGE at least 300GB SSD. With this configuration, I recommend buying VPS-3 from Contabo due to its relatively low price compared to other providers.
Purchase link: [Contabo VPS](https://contabo.com/en/vps/cloud-vps-3/?image=ubuntu.267&qty=1&contract=1&storage-type=vps-3-1-2-tb-ssd)

When purchasing, make sure to select Ubuntu 22.04 as the operating system.

### 2. Installation Steps

- SSH into the purchased server using the command and enter the password:

```bash
ssh root@ip_server
```

#### 2.1 Install Docker

```bash
sudo apt update

sudo apt install apt-transport-https ca-certificates curl software-properties-common

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update

apt-cache policy docker-ce

sudo apt install docker-ce
```

#### 2.2 Install the Node

*Note: Replace `MyNode` with the name of the node you set; this name will be used to fill in the form.*

```bash
# Download the node image
docker pull analoglabs/timechain
# Run the node
docker run -d -p 9944:9944 -p 30303:30303 analoglabs/timechain --base-path /data --rpc-external  --unsafe-rpc-external --rpc-methods=unsafe --name=MyNode --telemetry-url "wss://telemetry.analog.one/submit 0"
```

#### 2.3 Check the Node

To check if your node is running, use the following command:

```bash
docker ps
```

If the result is similar to the image below, your node is running.
![plot](./images/anh1.jpg)

To check the logs, you need the ID of the running container (use the `docker ps` command above to get the `container_id`):

```bash
docker logs container_id
```
*Note: Here you can check the node name as well as the node configuration.*

After this step, you have enough information to fill out the form and hope for the best. Form link: [Registration Form](https://l5d87lam6fy.typeform.com/to/kwlADm6U)

To create an Element account, you can go to this site and use Gmail to register an account:

[Element Registration](https://app.element.io/)

The created account will have the format @xxxxx:matrix.org, use this to fill out the form.

### 3. Create and Register Session Keys (This step is not needed yet)

#### 3.1 Generate Keys

```bash
curl -H "Content-Type: application/json" -d '{"id":1, "jsonrpc":"2.0", "method": "author_rotateKeys", "params":[]}' http://127.0.0.1:9944
```

The hash in the result is the session key that has been generated. Save this key.
```