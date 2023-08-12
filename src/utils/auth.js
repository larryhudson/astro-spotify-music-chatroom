import {getCurrentUserProfile} from "@src/utils/spotify";
import {getRecordWhere, createRecord} from "@src/utils/db"; 

export async function getSpotifyUserIdFromAuthToken(authToken) {

  const userProfile = await getCurrentUserProfile(authToken);

  return userProfile.id;
}

export async function getLocalUserFromAuthToken(authToken) {
  const spotifyUserId = await getSpotifyUserIdFromAuthToken(authToken);
  const localUser = getRecordWhere('users', {spotify_user_id: spotifyUserId});

  return localUser;
}

export async function createUserIfFirstLogin(authToken) {

  const userProfile = await getCurrentUserProfile(authToken);

  const existingUser = getRecordWhere('users', {spotify_user_id: userProfile.id});
  if (existingUser) return;

  const newUser = createRecord('users', {
    spotify_user_id: userProfile.id,
    name: userProfile.display_name
  })

}
