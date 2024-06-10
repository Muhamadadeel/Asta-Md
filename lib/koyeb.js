const axios = require("axios");
const koyebApi = process.env.KOYEB_API;
const axiosConfig = {
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    Authorization: `Bearer ${koyebApi}`
  }
};

async function get_deployments() {
  let status = false;
  const config = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${koyebApi}`
    }
  };

  await axios.get("https://app.koyeb.com/v1/deployments", config)
    .then(response => {
      const stoppedStates = ["STOPPED", "STOPPING", "ERROR", "ERRPRING"];
      const runningStates = [];

      for (let i = 0; i < response.data.deployments.length; i++) {
        if (!stoppedStates.includes(response.data.deployments[i].status)) {
          runningStates.push(response.data.deployments[i].status);
        }
      }

      if (runningStates.length > 1) {
        status = true;
      }
    });

  return status;
}

function checkArray(array, key) {
  return array.some(item => item.key === key);
}

async function delvar(varName) {
  let result = false;
  const { data: serviceData } = await axios.get("https://app.koyeb.com/v1/services", axiosConfig);
  const serviceId = serviceData.services[0].id;
  const { data: deploymentData } = await axios.get(`https://app.koyeb.com/v1/deployments/${serviceData.services[0].latest_deployment_id}`, axiosConfig);

  const varExists = checkArray(deploymentData.deployment.definition.env, varName);
  if (!varExists) {
    return "_No such env in koyeb._";
  }

  const newEnvVars = deploymentData.deployment.definition.env.filter(env => env.key !== varName);
  const patchData = {
    definition: {
      name: deploymentData.deployment.definition.name,
      routes: deploymentData.deployment.definition.routes,
      ports: deploymentData.deployment.definition.ports,
      env: newEnvVars,
      regions: deploymentData.deployment.definition.regions,
      scalings: deploymentData.deployment.definition.scalings,
      instance_types: deploymentData.deployment.definition.instance_types,
      health_checks: deploymentData.deployment.definition.health_checks,
      docker: deploymentData.deployment.definition.docker
    }
  };

  await axios.patch(`https://app.koyeb.com/v1/services/${serviceId}`, patchData, axiosConfig)
    .then(response => {
      if (response.status === 200) {
        result = `_Successfully deleted ${varName} var from koyeb._`;
      } else {
        result = "_Please put Koyeb api key in var KOYEB_API._\nEg: KOYEB_API:api key";
      }
    });

  return result;
}

async function change_env(envVarString) {
  let result = "_Please put Koyeb api key in var KOYEB_API._\nEg: KOYEB_API:api key";
  const { data: serviceData } = await axios.get("https://app.koyeb.com/v1/services", axiosConfig);
  const serviceId = serviceData.services[0].id;
  const { data: deploymentData } = await axios.get(`https://app.koyeb.com/v1/deployments/${serviceData.services[0].latest_deployment_id}`, axiosConfig);

  const [key, value] = envVarString.split(":");
  const newEnvVars = [];

  for (let i = 0; i < deploymentData.deployment.definition.env.length; i++) {
    if (deploymentData.deployment.definition.env[i].key === key) {
      newEnvVars.push({ scopes: ["region:fra"], key, value });
    } else {
      newEnvVars.push(deploymentData.deployment.definition.env[i]);
    }
  }

  const varExists = checkArray(newEnvVars, key);
  if (!varExists) {
    newEnvVars.push({ scopes: ["region:fra"], key, value });
  }

  const patchData = {
    definition: {
      name: deploymentData.deployment.definition.name,
      routes: deploymentData.deployment.definition.routes,
      ports: deploymentData.deployment.definition.ports,
      env: newEnvVars,
      regions: deploymentData.deployment.definition.regions,
      scalings: deploymentData.deployment.definition.scalings,
      instance_types: deploymentData.deployment.definition.instance_types,
      health_checks: deploymentData.deployment.definition.health_checks,
      docker: deploymentData.deployment.definition.docker
    }
  };

  await axios.patch(`https://app.koyeb.com/v1/services/${serviceId}`, patchData, axiosConfig)
    .then(response => {
      if (response.status === 200) {
        result = `Successfuly changed var _${key}:${value} ._`;
      } else {
        result = "_Please put Koyeb api key in var KOYEB_API._\nEg: KOYEB_API:api key";
      }
    });

  return result;
}

async function getallvar() {
  const { data: serviceData } = await axios.get("https://app.koyeb.com/v1/services", axiosConfig);
  const { data: deploymentData } = await axios.get(`https://app.koyeb.com/v1/deployments/${serviceData.services[0].latest_deployment_id}`, axiosConfig);

  const envVars = [];
  for (let i = 0; i < deploymentData.deployment.definition.env.length; i++) {
    if (!deploymentData.deployment.definition.env[i].key) {
      continue;
    }
    envVars.push(`*${deploymentData.deployment.definition.env[i].key}* : _${deploymentData.deployment.definition.env[i].value}_`);
  }

  return envVars.join("\n");
}

async function getvar(varName) {
  const { data: serviceData } = await axios.get("https://app.koyeb.com/v1/services", axiosConfig);
  const { data: deploymentData } = await axios.get(`https://app.koyeb.com/v1/deployments/${serviceData.services[0].latest_deployment_id}`, axiosConfig);

  for (let i = 0; i < deploymentData.deployment.definition.env.length; i++) {
    if (!deploymentData.deployment.definition.env[i].key) {
      continue;
    }
    if (deploymentData.deployment.definition.env[i].key === varName) {
      return `${deploymentData.deployment.definition.env[i].key}:${deploymentData.deployment.definition.env[i].value}`;
    }
  }
}

async function redeploy() {
  let result = false;
  const redeployData = {
    deployment_group: "prod",
    sha: ""
  };

  const { data: serviceData } = await axios.get("https://app.koyeb.com/v1/services", axiosConfig);
  const serviceId = serviceData.services[0].id;

  try {
    const response = await axios.post(`https://app.koyeb.com/v1/services/${serviceId}/redeploy`, redeployData, axiosConfig);
    result = "_update started._";
  } catch (error) {
    result = "*Got an error in redeploying.*\n*Please put koyeb api key in var KOYEB_API.*"
  }

    return result;
   }
   
   module.exports = {
    redeploy:redeploy,
    getvar:getvar,
    delvar:delvar,
    getallvar: getallvar,
    change_env: change_env,
    get_deployments: get_deployments
   };
/**
 * 
Koyeb API Utility
This module provides a set of functions to interact with the Koyeb API for managing deployments, services, and environment variables.
Dependencies

axios: A popular HTTP client library for making API requests.

Environment Variables

KOYEB_API: The API key for authenticating with the Koyeb API. This should be set as an environment variable.

Functions
getDeployments()
This async function retrieves the list of deployments from the Koyeb API and checks if there are multiple deployments in a running state.
Returns: A boolean value indicating if there are multiple running deployments.
checkArray(array, key)
This utility function checks if a given key exists in an array of objects.
Parameters:

array: The array of objects to search.
key: The key to search for.

Returns: A boolean value indicating if the key exists in the array.
delvar(varName)
This async function deletes the specified environment variable from the latest deployment.
Parameters:

varName: The name of the environment variable to delete.

Returns: A string indicating the result of the operation.
changeEnv(envVarString)
This async function updates or creates the specified environment variable in the latest deployment.
Parameters:

envVarString: A string in the format KEY:VALUE representing the environment variable to update or create.

Returns: A string indicating the result of the operation.
getAllVars()
This async function retrieves all environment variables for the latest deployment.
Returns: A string containing the environment variables in the format KEY: VALUE.
getvar(varName)
This async function retrieves the value of the specified environment variable from the latest deployment.
Parameters:

varName: The name of the environment variable to retrieve.

Returns: A string containing the environment variable in the format KEY:VALUE, or undefined if the variable is not found.
redeploy()
This async function triggers a redeployment of the service.
Returns: A string indicating the result of the redeployment operation.
Usage

Set the KOYEB_API environment variable with your Koyeb API key.
Import the required functions from the module:

javascriptCopy codeconst { delvar, changeEnv, getAllVars, getvar, redeploy } = require('./koyeb-utility');

Use the functions as needed, for example:

javascriptCopy code// Delete an environment variable
const deleteResult = await delvar('MY_VAR');
console.log(deleteResult);

// Update or create an environment variable
const updateResult = await changeEnv('MY_VAR:new_value');
console.log(updateResult);

// Get all environment variables
const allVars = await getAllVars();
console.log(allVars);

// Get the value of a specific environment variable
const varValue = await getvar('MY_VAR');
console.log(varValue);

// Trigger a redeployment
const redeployResult = await redeploy();
console.log(redeployResult);
 */

/**
 * redeploy: redeploy,
  getvar: getvar,
  delvar: delvar,
  getallvar: getallvar,
  change_env: change_env,
  get_deployments: get_deployments
 */