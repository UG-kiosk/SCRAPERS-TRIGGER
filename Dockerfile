FROM mcr.microsoft.com/azure-functions/node:3.0-node14-core-tools

ENV AzureWebJobsScriptRoot=/home/site/wwwroot \
    AzureFunctionsJobHost__Logging__Console__IsEnabled=true

COPY . /home/site/wwwroot