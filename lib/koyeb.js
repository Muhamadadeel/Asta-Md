const axios = require("axios");
const koyeb_api = process.env.KOYEB_API;
const axiosConfig = {
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    Authorization: `Bearer ${koyeb_api}`
  }
};

async function get_deployments() {
  let status = false;
  const config = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${koyeb_api}`
    }
  };

  try {
    const response = await axios.get("https://app.koyeb.com/v1/deployments", config);
    const statusList = ["STOPPED", "STOPPING", "ERROR", "ERRPRING"];
    const activeDeployments = response.data.deployments.filter(deployment => !statusList.includes(deployment.status));

    if (activeDeployments.length > 1) {
      status = true;
    }
  } catch (error) {
    console.error("Error fetching deployments:", error);
  }

  return status;
}

function checkArray(array, key) {
  return array.some(item => item.key === key);
}

async function delvar(varName) {
  try {
    const { data: services } = await axios.get("https://app.koyeb.com/v1/services", axiosConfig);
    const serviceId = services.services[0].id;
    const { data: deployment } = await axios.get(`https://app.koyeb.com/v1/deployments/${services.services[0].latest_deployment_id}`, axiosConfig);

    if (!checkArray(deployment.deployment.definition.env, varName)) {
      return "_No such env in koyeb._";
    }

    const newEnv = deployment.deployment.definition.env.filter(env => env.key !== varName);
    const updatedDefinition = {
      definition: {
        ...deployment.deployment.definition,
        env: newEnv
      }
    };

    const { status } = await axios.patch(`https://app.koyeb.com/v1/services/${serviceId}`, updatedDefinition, axiosConfig);

    if (status === 200) {
      return `_Successfully deleted ${varName} var from koyeb._`;
    } else {
      return "_Please put Koyeb api key in var KOYEB_API._\nEg: KOYEB_API:api key";
    }
  } catch (error) {
    console.error("Error deleting variable:", error);
    return "_Please put Koyeb api key in var KOYEB_API._\nEg: KOYEB_API:api key";
  }
}

async function change_env(varNameValue) {
  try {
    const [varName, varValue] = varNameValue.split(":");
    const { data: services } = await axios.get("https://app.koyeb.com/v1/services", axiosConfig);
    const serviceId = services.services[0].id;
    const { data: deployment } = await axios.get(`https://app.koyeb.com/v1/deployments/${services.services[0].latest_deployment_id}`, axiosConfig);

    const newEnv = deployment.deployment.definition.env.map(env => {
      if (env.key === varName) {
        return { scopes: ["region:fra"], key: varName, value: varValue };
      }
      return env;
    });

    if (!checkArray(newEnv, varName)) {
      newEnv.push({ scopes: ["region:fra"], key: varName, value: varValue });
    }

    const updatedDefinition = {
      definition: {
        ...deployment.deployment.definition,
        env: newEnv
      }
    };

    const { status } = await axios.patch(`https://app.koyeb.com/v1/services/${serviceId}`, updatedDefinition, axiosConfig);

    if (status === 200) {
      return `Successfuly changed var _${varName}:${varValue} ._`;
    } else {
      return "_Please put Koyeb api key in var KOYEB_API._\nEg: KOYEB_API:api key";
    }
  } catch (error) {
    console.error("Error changing environment variable:", error);
    return "_Please put Koyeb api key in var KOYEB_API._\nEg: KOYEB_API:api key";
  }
}

async function getallvar() {
  try {
    const { data: services } = await axios.get("https://app.koyeb.com/v1/services", axiosConfig);
    const { data: deployment } = await axios.get(`https://app.koyeb.com/v1/deployments/${services.services[0].latest_deployment_id}`, axiosConfig);

    const envVars = deployment.deployment.definition.env
      .filter(env => env.key)
      .map(env => `*${env.key}* : _${env.value}_`);

    return envVars.join("\n");
  } catch (error) {
    console.error("Error fetching environment variables:", error);
    return "Failed to fetch environment variables";
  }
}

async function getvar(varName) {
  try {
    const { data: services } = await axios.get("https://app.koyeb.com/v1/services", axiosConfig);
    const { data: deployment } = await axios.get(`https://app.koyeb.com/v1/deployments/${services.services[0].latest_deployment_id}`, axiosConfig);

    const env = deployment.deployment.definition.env.find(env => env.key === varName);

    if (env) {
      return `${env.key}:${env.value}`;
    } else {
      return `Environment variable ${varName} not found`;
    }
  } catch (error) {
    console.error("Error fetching environment variable:", error);
    return "Failed to fetch environment variable";
  }
}

async function redeploy() {
  const deploymentOptions = {
    deployment_group: "prod",
    sha: ""
  };

  try {
    const { data: services } = await axios.get("https://app.koyeb.com/v1/services", axiosConfig);
    const serviceId = services.services[0].id;

    await axios.post(`https://app.koyeb.com/v1/services/${serviceId}/redeploy`, deploymentOptions, axiosConfig);
    return "_update started._";
  } catch (error) {
    console.error("Error redeploying:", error);
    return "*Got an error in redeploying.*\n*Please put koyeb api key in var KOYEB_API.*\n_Eg: KOYEB_API:api key from https://app.koyeb.com/account/api ._";
  }
}

module.exports = {
  redeploy,
  getvar,
  delvar,
  getallvar,
  change_env,
  get_deployments
};