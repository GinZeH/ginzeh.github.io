import type { FriendLink, FriendsPageConfig } from "../types/config";
import friendsData from "../content/friends-settings/friends.json";

export const friendsPageConfig: FriendsPageConfig = {
	title: friendsData.title,
	description: friendsData.description,
	showCustomContent: true,
	showComment: true,
	randomizeSort: false,
};

export const friendsConfig: FriendLink[] = friendsData.friends.map((friend) => ({
	title: friend.title,
	imgurl: friend.imgurl,
	desc: friend.desc,
	siteurl: friend.siteurl,
	tags: (friend as any).tags ?? [],
	weight: (friend as any).weight ?? 0,
	enabled: friend.enabled,
}));

export const getEnabledFriends = (): FriendLink[] => {
	const friends = friendsConfig.filter((friend) => friend.enabled);

	if (friendsPageConfig.randomizeSort) {
		return friends.sort(() => Math.random() - 0.5);
	}

	return friends.sort((a, b) => b.weight - a.weight);
};
