const ForbiddenException = require('../services/errors/ForbiddenException');
const profilesServices = require('../services/store/profiles.services');

const ACTIONS = {
  READ: 'read',
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
};

const POSSESSIONS = {
  ANY: 'any',
  OWN: 'own',
};

const RESOURCES = {
  POSTS: 'posts',
  PROFILES: 'profiles',
  FILES: 'files',
};

const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
};

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
    possession: POSSESSIONS.OWN,
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

const rulesACL = {
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

// eslint-disable-next-line consistent-return
module.exports = (rule) => async (req, res, next) => {
  const rules = Array.isArray(rule) ? rule : [rule];
  let isAllow = false;

  const { profileid } = req.session;

  const user = await profilesServices.getRole(profileid);

  if (user) {
    // eslint-disable-next-line no-restricted-syntax
    for await (const checkRule of rules) {
      if (rulesACL[user.role] && rulesACL[user.role][checkRule.resource]) {
        // eslint-disable-next-line no-restricted-syntax
        for await (const permission of rulesACL[user.role][
          checkRule.resource
        ]) {
          const canUseAnyAction =
            permission.possession === POSSESSIONS.ANY &&
            permission.action === checkRule.action;

          if (checkRule.possession === POSSESSIONS.ANY) {
            if (canUseAnyAction) {
              isAllow = true;
            }
          } else if (canUseAnyAction) {
            isAllow = true;
          } else {
            const resource = await checkRule.getResource(req);

            if (checkRule.isOwn(resource, profileid)) {
              isAllow = true;
            }
          }
        }
      }
    }
  }

  if (isAllow) {
    return next();
  }

  next(new ForbiddenException());
};
