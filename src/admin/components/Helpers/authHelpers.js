export function isPartnerEnabled(email, auth) {
  if (email) {
    return fetch(`${process.env.REACT_APP_API_URL}/admin/checkEnabledUser`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${auth.getAccessToken()}`,
      },
      body: JSON.stringify({ email: email }),
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

export function isSuperadmin(email, auth) {
  if (email) {
    return fetch(`${process.env.REACT_APP_API_URL}/admin/checkSuperadmin`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${auth.getAccessToken()}`,
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
