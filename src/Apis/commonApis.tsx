export const getFetch = async (api: any, body: any) => {
  if (body) {
    let entries = Object.keys(body);
    let data = new FormData();
    for (let i = 0; i < entries.length; i++) {
      data.append(entries[i], body[entries[i]]);
    }
    const res = await fetch(api, {
      method: "get",
      headers: {
        Authorization: "Bearer" + JSON.parse(localStorage.getItem("token")!),
      },
      // body: data,
    });
    const r = await res.json();
    return r;
  } else {
    const res = await fetch(api, {
      method: "get",
      headers: {
        Authorization: "Bearer" + JSON.parse(localStorage.getItem("token")!),
      },
    });
    const r = await res.json();
    return r;
  }
};

export const fetch2 = async (api: any, body: any) => {
  if (body) {
    let entries = Object.keys(body);
    let data = new FormData();
    for (let i = 0; i < entries.length; i++) {
      data.append(entries[i], body[entries[i]]);
    }
    const res = await fetch(api, {
      method: "post",
      headers: {
        Authorization: "Bearer" + JSON.parse(localStorage.getItem("token")!),
      },
      body: data,
    });
    return await res.json();
  } else {
    const res = await fetch(api, {
      method: "post",
      headers: {
        Authorization: "Bearer" + JSON.parse(localStorage.getItem("token")!),
      },
    });
    return await res.json();
  }
};

export const fetch3 = async (api: any, type: any) => {
  const res = await fetch(api, {
    method: type,
    headers: {
      Authorization: "Bearer" + JSON.parse(localStorage.getItem("token")!),
    },
  });
  return await res.json();
};

export const fetch4 = async (api: any, body: any) => {
  if (body) {
    const res = await fetch(api, {
      method: "post",
      headers: {
        Authorization: "Bearer" + JSON.parse(localStorage.getItem("token")!),
      },
      body: JSON.stringify(body),
    });
    return await res.json();
  } else {
    const res = await fetch(api, {
      method: "post",
      headers: {
        Authorization: "Bearer" + JSON.parse(localStorage.getItem("token")!),
      },
    });
    return await res.json();
  }
};
