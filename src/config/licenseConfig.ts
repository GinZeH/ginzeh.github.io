import type { LicenseConfig } from "../types/config";
import { getLicenseConfig } from "./siteConfig";

const licenseSettings = getLicenseConfig();

export const licenseConfig: LicenseConfig = {
	enable: licenseSettings.enable,
	name: licenseSettings.name,
	url: licenseSettings.url,
};