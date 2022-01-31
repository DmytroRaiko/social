const settings = require('./settings');

export const onAddArticleFormSubmit = async (data) => {
  try {
    const request = async () => {
      const res = await fetch(`${settings.URI}/posts/`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(data),
      });

      const respons = await res.json();

      if (!respons.success) {
        throw new Error(respons);
      }
    };

    if (data) {
      request();
      return 1;
    }
    return 0;
  } catch (e) {
    return e;
  }
};

export const onEditArticleFormSubmit = async (data, postId) => {
  try {
    const request = async () => {
      const res = await fetch(`${settings.URI}/posts/${postId}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'PUT',
        body: JSON.stringify(data),
      });

      const respons = await res.json();

      if (!respons.success) {
        throw new Error(respons);
      }
    };

    if (data && postId) {
      request();
      return 1;
    }
    return 0;
  } catch (e) {
    return e;
  }
};

export const onDeleteArticle = async (postId) => {
  try {
    const request = async () => {
      const res = await fetch(`${settings.URI}/posts/${postId}`, {
        method: 'DELETE',
      });

      const respons = await res.json();

      if (!respons.success) {
        throw new Error(respons);
      }
    };

    if (postId) {
      request();
      return 1;
    }
    return 0;
  } catch (e) {
    return e;
  }
};
