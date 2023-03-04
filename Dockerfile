# For more information, please refer to https://aka.ms/vscode-docker-python
FROM node:18-alpine3.16

EXPOSE 3000

# Setup PS1 terminal
ENV PS1='\[\033[1;36m\]\u@\h:\w\$\[\033[0m\] '

WORKDIR /workspace

RUN apk add --no-cache git wget jq tree sudo bash bash-completion git-bash-completion colordiff alpine-sdk

# Creates a non-root user with an explicit UID and adds permission to access the /workspace folder
# For more info, please refer to https://aka.ms/vscode-docker-python-configure-containers
RUN adduser -u 5678 --disabled-password --gecos "" appuser && chown -R appuser /workspace \
    && echo '%wheel ALL=(ALL) NOPASSWD: ALL' > /etc/sudoers.d/wheel && adduser appuser wheel \
    && sed -i 's/\/bin\/ash/\/bin\/bash/g' /etc/passwd \
    && wget https://raw.githubusercontent.com/git/git/master/contrib/completion/git-prompt.sh -P /bin \
    && echo "source /bin/git-prompt.sh" >> /etc/bash/bashrc \
    && echo 'export PS1="\u@\h \[\033[32m\]\w\[\033[33m\]\$(__git_ps1 \" (%s)\")\[\033[00m\] $ "' >> /etc/bash/bashrc
USER appuser

CMD ["sleep", "infinity"]
