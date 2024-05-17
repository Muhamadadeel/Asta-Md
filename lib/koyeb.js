const axios = require("axios");

// Check if the KOYEB_API environment variable is set
if (!process.env.KOYEB_API) {
  throw new Error(
    "Please set the KOYEB_API environment variable to your Koyeb API key."
  );
}

const koyebApi = process.env.KOYEB_API;
const axiosConfig = {
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    Authorization: `Bearer ${koyebApi}`,
  },
};

async function get_deployments() {
  try {
    const response = await axios.get(
      "https://app.koyeb.com/v1/deployments",
      axiosConfig
    );
    const stoppedStates = ["STOPPED", "STOPPING", "ERROR", "ERRPRING"];
    const runningStates = response.data.deployments
      .filter((deployment) => !stoppedStates.includes(deployment.status))
      .map((deployment) => deployment.status);

    return runningStates.length > 1;
  } catch (error) {
    console.error("Error getting deployments:", error);
    return false;
  }
}

function checkArrayForKey(array, key) {
  return array.some((item) => item.key === key);
}

async function delvar(varName) {
  try {
    const { data: serviceData } = await axios.get(
      "https://app.koyeb.com/v1/services",
      axiosConfig
    );
    const serviceId = serviceData.services[0].id;
    const { data: deploymentData } = await axios.get(
      `https://app.koyeb.com/v1/deployments/${serviceData.services[0].latest_deployment_id}`,
      axiosConfig
    );

    if (!checkArrayForKey(deploymentData.deployment.definition.env, varName)) {
      return "No such env in Koyeb.";
    }

    const newEnvVars = deploymentData.deployment.definition.env.filter(
      (env) => env.key !== varName
    );
    const deploymentDefinition = {
      ...deploymentData.deployment.definition,
      env: newEnvVars,
    };

    await axios.patch(
      `https://app.koyeb.com/v1/services/${serviceId}`,
      { definition: deploymentDefinition },
      axiosConfig
    );
    return `Successfully deleted ${varName} var from Koyeb.`;
  } catch (error) {
    console.error("Error deleting environment variable:", error);
    return "Please put Koyeb API key in var KOYEB_API. Eg: KOYEB_API=<api_key>";
  }
}

async function change_env(varNameAndValue) {
  try {
    const [varName, varValue] = varNameAndValue.split(":");
    const { data: serviceData } = await axios.get(
      "https://app.koyeb.com/v1/services",
      axiosConfig
    );
    const serviceId = serviceData.services[0].id;
    const { data: deploymentData } = await axios.get(
      `https://app.koyeb.com/v1/deployments/${serviceData.services[0].latest_deployment_id}`,
      axiosConfig
    );

    const newEnvVars = deploymentData.deployment.definition.env.map((env) => {
      if (env.key === varName) {
        return { ...env, value: varValue };
      }
      return env;
    });

    if (!checkArrayForKey(newEnvVars, varName)) {
      newEnvVars.push({
        scopes: ["region:fra"],
        key: varName,
        value: varValue,
      });
    }

    const deploymentDefinition = {
      ...deploymentData.deployment.definition,
      env: newEnvVars,
    };

    await axios.patch(
      `https://app.koyeb.com/v1/services/${serviceId}`,
      { definition: deploymentDefinition },
      axiosConfig
    );
    return `Successfully changed var ${varName}:${varValue}.`;
  } catch (error) {
    console.error("Error changing environment variable:", error);
    return "Please put Koyeb API key in var KOYEB_API. Eg: KOYEB_API=<api_key>";
  }
}

async function getallvar() {
  try {
    const { data: serviceData } = await axios.get(
      "https://app.koyeb.com/v1/services",
      axiosConfig
    );
    const { data: deploymentData } = await axios.get(
      `https://app.koyeb.com/v1/deployments/${serviceData.services[0].latest_deployment_id}`,
      axiosConfig
    );

    const envVars = deploymentData.deployment.definition.env
      .filter((env) => env.key)
      .map((env) => `*${env.key}* : _${env.value}_`);

    return envVars.join("\n");
  } catch (error) {
    console.error("Error getting environment variables:", error);
    return "Error getting environment variables.";
  }
}

async function getvar(varName) {
  try {
    const { data: serviceData } = await axios.get(
      "https://app.koyeb.com/v1/services",
      axiosConfig
    );
    const { data: deploymentData } = await axios.get(
      `https://app.koyeb.com/v1/deployments/${serviceData.services[0].latest_deployment_id}`,
      axiosConfig
    );

    const envVar = deploymentData.deployment.definition.env.find(
      (env) => env.key === varName
    );
    if (envVar) {
      return `${envVar.key}:${envVar.value}`;
    }
    return `Environment variable ${varName} not found.`;
  } catch (error) {
    console.error("Error getting environment variable:", error);
    return "Error getting environment variable.";
  }
}

async function redeploy() {
  try {
    const { data: serviceData } = await axios.get(
      "https://app.koyeb.com/v1/services",
      axiosConfig
    );
    const serviceId = serviceData.services[0].id;

    await axios.post(
      `https://app.koyeb.com/v1/services/${serviceId}/redeploy`,
      { deployment_group: "prod", sha: "" },
      axiosConfig
    );
    return "Update started.";
  } catch (error) {
    console.error("Error redeploying:", error);
    return "Got an error in redeploying. Please put Koyeb API key in var KOYEB_API. Eg: KOYEB_API=<api_key>";
  }
}
// Below These Modules Are Exported To The Index.js File, Then can be imported externally from plugins files in the plugins folder.
// WARNING: Don't ReModify The Exports
module.exports = {
  redeploy: redeploy,
  getvar: getvar,
  delvar: delvar,
  getallvar: getallvar,
  change_env: change_env,
  get_deployments: get_deployments,
};
// ASTA MD