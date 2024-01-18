// Non-exhaustive definition of the SteamClient that is available in the SP tab
// This object has a lot more properties/methods than are listed here
declare namespace SteamClient {
	const Apps: {
		GetAllShortcuts(): Promise<Shortcut[]>
		RegisterForGameActionStart(
			callback: (
				actionType: number,
				strAppId: string,
				actionName: string
			) => any
		): RegisteredEvent
		RegisterForAppDetails(appid: string,
			callback: (
				details: AppDetails
			) => any
		): RegisteredEvent
		GetMyAchievementsForApp(appid: string,
			callback: (
				details: AppAchievements
			) => any
		): RegisteredEvent
	}
	const InstallFolder: {
		GetInstallFolders(): Promise<InstallFolder[]>
	}
	const GameSessions: {
		RegisterForAppLifetimeNotifications(
			callback: (appState: AppState) => any
		): RegisteredEvent
	}
	const BrowserView: {
		Create(): any
		CreatePopup(): any
		Destroy(e: any): void
	}

	const Storage: {
		GetJSON(key: string): Promise<string>
		SetObject(key: string, value: {}): Promise<void>
	}
}

declare const enum DisplayStatus {
	Invalid = 0,
	Launching = 1,
	Uninstalling = 2,
	Installing = 3,
	Running = 4,
	Validating = 5,
	Updating = 6,
	Downloading = 7,
	Synchronizing = 8,
	ReadyToInstall = 9,
	ReadyToPreload = 10,
	ReadyToLaunch = 11,
	RegionRestricted = 12,
	PresaleOnly = 13,
	InvalidPlatform = 14,
	PreloadComplete = 16,
	BorrowerLocked = 17,
	UpdatePaused = 18,
	UpdateQueued = 19,
	UpdateRequired = 20,
	UpdateDisabled = 21,
	DownloadPaused = 22,
	DownloadQueued = 23,
	DownloadRequired = 24,
	DownloadDisabled = 25,
	LicensePending = 26,
	LicenseExpired = 27,
	AvailForFree = 28,
	AvailToBorrow = 29,
	AvailGuestPass = 30,
	Purchase = 31,
	Unavailable = 32,
	NotLaunchable = 33,
	CloudError = 34,
	CloudOutOfDate = 35,
	Terminating = 36,
}

type AppAchievements = {
    nAchieved: number;
    nTotal: number;
    vecAchievedHidden: any[];
    vecHighlight: any[];
    vecUnachieved: any[];
};

type AppDetails = {
    achievements: AppAchievements;
    bCanMoveInstallFolder: boolean;
    bCloudAvailable: boolean;
    bCloudEnabledForAccount: boolean;
    bCloudEnabledForApp: boolean;
    bCloudSyncOnSuspendAvailable: boolean;
    bCloudSyncOnSuspendEnabled: boolean;
    bCommunityMarketPresence: boolean;
    bEnableAllowDesktopConfiguration: boolean;
    bFreeRemovableLicense: boolean;
    bHasAllLegacyCDKeys: boolean;
    bHasAnyLocalContent: boolean;
    bHasLockedPrivateBetas: boolean;
    bIsExcludedFromSharing: boolean;
    bIsSubscribedTo: boolean;
    bOverlayEnabled: boolean;
    bOverrideInternalResolution: boolean;
    bRequiresLegacyCDKey: boolean;
    bShortcutIsVR: boolean;
    bShowCDKeyInMenus: boolean;
    bShowControllerConfig: boolean;
    bSupportsCDKeyCopyToClipboard: boolean;
    bVRGameTheatreEnabled: boolean;
    bWorkshopVisible: boolean;
    eAppOwnershipFlags: number;
    eAutoUpdateValue: number;
    eBackgroundDownloads: number;
    eCloudSync: number;
    eControllerRumblePreference: number;
    eDisplayStatus: number;
    eEnableThirdPartyControllerConfiguration: number;
    eSteamInputControllerMask: number;
    iInstallFolder: number;
    lDiskUsageBytes: number;
    lDlcUsageBytes: number;
    nBuildID: number;
    nCompatToolPriority: number;
    nPlaytimeForever: number;
    nScreenshots: number;
    rtLastTimePlayed: number;
    rtLastUpdated: number;
    rtPurchased: number;
    selectedLanguage: {
        strDisplayName: string;
        strShortName: string;
    };
    strCloudBytesAvailable: string;
    strCloudBytesUsed: string;
    strCompatToolDisplayName: string;
    strCompatToolName: string;
    strDeveloperName: string;
    strDeveloperURL: string;
    strDisplayName: string;
    strExternalSubscriptionURL: string;
    strFlatpakAppID: string;
    strHomepageURL: string;
    strLaunchOptions: string;
    strManualURL: string;
    strOwnerSteamID: string;
    strResolutionOverride: string;
    strSelectedBeta: string;
    strShortcutExe: string;
    strShortcutLaunchOptions: string;
    strShortcutStartDir: string;
    strSteamDeckBlogURL: string;
    unAppID: number;
    vecBetas: any[];
    vecDLC: any[];
    vecDeckCompatTestResults: any[];
    vecLanguages: AppLanguages[];
    vecLegacyCDKeys: any[];
    vecMusicAlbums: any[];
    vecPlatforms: string[];
    vecScreenShots: any[];
    libraryAssets?: {
        logoPosition?: LogoPosition;
    };
}

type AppState = {
	unAppID: number
	nInstanceID: number
	bRunning: boolean
}

declare namespace appStore {
	function GetAppOverviewByGameID(appId: number): AppOverview
}

type RegisteredEvent = {
	unregister(): void
}

type Shortcut = {
	appid: number
	data: {
		bIsApplication: true
		strAppName: string
		strSortAs: string
		strExePath: string
		strShortcutPath: string
		strArguments: string
		strIconPath: string
	}
}

type AppOverview = {
	appid: string
	display_name: string
	display_status: DisplayStatus
	sort_as: string
}

type App = {
	nAppID: number
	strAppName: string
	strSortAs: string
	rtLastPlayed: number
	strUsedSize: string
	strDLCSize: string
	strWorkshopSize: string
	strStagedSize: string
}

type InstallFolder = {
	nFolderIndex: number
	strFolderPath: string
	strUserLabel: string
	strDriveName: string
	strCapacity: string
	strFreeSpace: string
	strUsedSize: string
	strDLCSize: string
	strWorkshopSize: string
	strStagedSize: string
	bIsDefaultFolder: boolean
	bIsMounted: boolean
	bIsFixed: boolean
	vecApps: App[]
}