import config from '../conf.json';

export const GlobalVariable = Object.freeze({
    IP_ADDRESS: config.ipAddress,
    NODE_PORT: config.nodePort,
    NG_PORT: config.ngPort
});