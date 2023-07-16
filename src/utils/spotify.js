export async function getAuthToken({code}) {

    const {SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET} = import.meta.env
    const formData = new FormData();
    formData.append('grant_type', 'authorization_code');
    formData.append('code', code);
    formData.append('redirect_uri', 'http://localhost:3000/auth/spotify/callback');

    const encodedData = new URLSearchParams(formData).toString();

    const spotifyTokenUrl = `https://accounts.spotify.com/api/token` 
    const authCode = (new Buffer.from(SPOTIFY_CLIENT_ID + ":" + SPOTIFY_CLIENT_SECRET).toString('base64'))
    const spotifyResponse = await fetch(spotifyTokenUrl, {
	headers: {
	    'Authorization': `Basic ${authCode}`,
	    'Content-Type': 'application/x-www-form-urlencoded'
	},
	method: 'POST',
	body: encodedData
    }).then(response => response.json())

    return spotifyResponse.access_token;
}

export async function playTrackForUser({authToken, trackId, positionMs=0}) {
    const spotifyUrl = "https://api.spotify.com/v1/me/player/play";
    const spotifyRequestData = {
	context_uri: `spotify:track:${trackId}`
	position_ms: positionMs,
	// if we want to do offset later on
	// offset: {
	//   position: 5
	//   }
    }

    const spotifyResponse = await fetch(spotifyUrl, {
	method: 'PUT',
	headers: {
	    'Authorization': `Bearer ${authToken}`,
	},
	body: JSON.stringify(spotifyRequestData)
    }

    if (!spotifyResponse.ok) {
	// handle error
    }
}
