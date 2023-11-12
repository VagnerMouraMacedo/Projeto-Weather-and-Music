async function obeterAcessoToken() {
  const credentials = `${clientId}:${clientSecret}`;
  const encodedCrendentials = btoa(credentials);

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${encodedCrendentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_creditials",
  });

  console.log(response);
}
