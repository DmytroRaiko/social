const ROLES = require('./roles');
const ACTIONS = require('./actions');
const POSSESSIONS = require('./possessions');
const RESOURCES = require('./resources');

const adminAllow = [
  {
    action: ACTIONS.CREATE,
    possession: POSSESSIONS.ANY,
  },
  {
    action: ACTIONS.DELETE,
    possession: POSSESSIONS.ANY,
  },
  {
    action: ACTIONS.READ,
    possession: POSSESSIONS.ANY,
  },
  {
    action: ACTIONS.UPDATE,
    possession: POSSESSIONS.OWN,
  },
];

const userAllow = [
  {
    action: ACTIONS.CREATE,
    possession: POSSESSIONS.ANY,
  },
  {
    action: ACTIONS.DELETE,
    possession: POSSESSIONS.OWN,
  },
  {
    action: ACTIONS.READ,
    possession: POSSESSIONS.ANY,
  },
  {
    action: ACTIONS.UPDATE,
    possession: POSSESSIONS.OWN,
  },
];

module.exports = {
  [ROLES.ADMIN]: {
    [RESOURCES.POSTS]: adminAllow,
    [RESOURCES.PROFILES]: adminAllow,
    [RESOURCES.FILES]: adminAllow,
  },
  [ROLES.USER]: {
    [RESOURCES.POSTS]: userAllow,
    [RESOURCES.PROFILES]: userAllow,
    [RESOURCES.FILES]: userAllow,
  },
};
